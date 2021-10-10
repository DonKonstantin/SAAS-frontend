import {ExcelFileInterface, ExcelFilePipelines} from "./interface";
import {Editor, FileData, LoadFileData, WsMessage} from "../type";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import Handsontable from "handsontable";
import {auditTime, bufferTime, distinctUntilChanged, throttleTime} from "rxjs/operators";
import {Authorization} from "../../../reduxStore/stores/Authorization";
import {v4} from "uuid";
import {ExcelFileConnectionInterface} from "../excelFileConnection/interface";
import {CommandReceiverInterface} from "./commandReceiver/interface";
import {notificationsDispatcher} from "../../notifications";

/**
 * Сущность Excel файла
 */
export class ExcelFile implements ExcelFileInterface {
    private readonly pipes: ExcelFilePipelines;
    private readonly closeCallback: { (): void };
    private readonly connection: ExcelFileConnectionInterface;
    private readonly commandReceiver: CommandReceiverInterface;
    private readonly editor: Editor;
    private persistedData: string[][];

    /**
     * Конструктор файла
     * @param fileId
     * @param user
     * @param connection
     * @param commandReceiver
     */
    constructor(
        fileId: string,
        user: Authorization,
        connection: ExcelFileConnectionInterface,
        commandReceiver: CommandReceiverInterface,
    ) {
        this.connection = connection;
        this.commandReceiver = commandReceiver;
        this.persistedData = [];
        this.editor = {
            id: v4(),
            name: `${user.user.first_name} ${user.user.last_name}`,
            token: user.token,
        };

        this.pipes = {
            commandProcessContext$: new Subject<WsMessage>(),
            dataContext$: new BehaviorSubject<LoadFileData>({
                editors: [],
                editorsPosition: [],
                fileData: {
                    id: 0,
                    name: "",
                    company_id: "",
                    data: [],
                    created_at: "",
                    last_modified: "",
                }
            }),
            sendChangesContext$: new Subject<Handsontable.CellChange>(),
            sendPositionContext$: new Subject<{row: number, col: number}>()
        };

        // Прием команд от WS сервиса
        const excelSubscription = this.connection
            .ReceiveMessages()
            .subscribe({
                next: message => this.pipes.commandProcessContext$.next(message)
            })
        ;

        // Подключаем пользователя к файлу
        this.connection.DispatchCommand("ConnectUserToFileCommand", {
            editor: this.editor,
            file: parseInt(fileId),
        });

        // Запускаем основные подписки.
        const unsubscribe = this.subscribe();

        // Выставляем отписку от событий
        this.closeCallback = () => {
            unsubscribe();

            excelSubscription.unsubscribe();
            this.connection.Disconnect();

            this.pipes.dataContext$.complete();
            this.pipes.sendChangesContext$.complete();
            this.pipes.sendPositionContext$.complete();
            this.pipes.commandProcessContext$.complete();
        }
    }


    /**
     * Подписка на обновления данных файла
     */
    getFileData(): Observable<LoadFileData> {
        const {dataContext$} = this.pipes;

        return dataContext$.pipe(auditTime(200))
    }

    /**
     * Получение пользователя, находящегося на запрошенной ячейке
     * @param row
     * @param col
     */
    getUserThatSelectCell(row: number, col: number): Editor | undefined {
        const {dataContext$} = this.pipes;
        const {editorsPosition, editors} = dataContext$.getValue();

        const position = editorsPosition.find(position => {
            position.row == row && position.col == col
        });

        if (!position) {
            return undefined
        }

        return editors.find(e => e.id === position.editor_id);
    }

    /**
     * Обработка изменения данных
     * @param changes
     */
    onChangeData(changes: Handsontable.CellChange[]): void {
        const {sendChangesContext$} = this.pipes;

        changes.map(c => sendChangesContext$.next(c))
    }

    /**
     * Обработка изменения позиционирования пользователя на файле
     * @param row
     * @param col
     */
    onChangePosition(row: number, col: number): void {
        const {sendPositionContext$} = this.pipes;

        sendPositionContext$.next({row, col})
    }

    /**
     * Обработка изменения позиционирования пользователя на файле
     */
    onClose(): void {
        this.closeCallback();
    }

    /**
     * Все подписки на события в пайпах.
     * По сути реализуют весь процесс согласованности в файле Excel.
     */
    private subscribe(): { (): void } {
        const {
            dataContext$,
            commandProcessContext$,
            sendPositionContext$,
            sendChangesContext$,
        } = this.pipes;

        // Подписываемся на обнволения от WSS сервера
        const commandSubscription = commandProcessContext$.subscribe({
            next: command => this.commandReceiver.ProcessCommand(dataContext$, command)
        });

        /**
         * Нет необходимости часто обновлять положение пользователя.
         * Актуальное положение получаем через аудит.
         */
        const sendPositionSubscription = sendPositionContext$
            .pipe(
                throttleTime(500),
                distinctUntilChanged((prev, next) => {
                    return prev.row === next.row
                        && prev.col === next.col
                }),
            )
            .subscribe({
                next: position => {
                    try {
                        const {fileData: {id}} = dataContext$.getValue();
                        this.connection.DispatchCommand("UpdateUserPositionInFileCommand", {
                            file: id,
                            position: {
                                editor_id: this.editor.id,
                                row: position.row,
                                col: position.col,
                            },
                        })
                    } catch (e) {
                        notificationsDispatcher().dispatch({
                            message: "Не удалось отправить данные о расположении пользователя. Плохая связь с WSS. Рекомендуется перезагрузить страницу.",
                            type: "warning"
                        });
                    }
                }
            })
        ;

        /**
         * Обновляем контекст только пачкой.
         * Если изменений нет, то и отправлять нечего.
         */
        const dataChangeSubscription = sendChangesContext$
            .pipe(
                bufferTime(50),
                distinctUntilChanged((prev, next) => {
                    const [prevRow, prevColumn, prevOldValue, prevNewValue] = prev;
                    const [nextRow, nextColumn, nextOldValue, nextNewValue] = next;

                    return prevRow === nextRow
                        && prevColumn === nextColumn
                        && prevOldValue === nextOldValue
                        && prevNewValue === nextNewValue
                }),
            )
            .subscribe({
                next: changes => {
                    if (0 === changes.length) {
                        return
                    }

                    const {fileData, ...another} = dataContext$.getValue();
                    try {
                        const data: FileData = JSON.parse(JSON.stringify(fileData));
                        changes.forEach(([row, column, _, newValue]) => {
                            const val = newValue ? `${newValue}` : ``;

                            if (!data.data[row]) {
                                data.data[row] = []
                            }

                            const col = parseInt(`${column}`);
                            data.data[row][col] = val;

                            // Асинхронно отправляем изменения на сервер
                            setTimeout(() => {
                                this.connection.DispatchCommand("UpdateFileDataCommand", {
                                    col: col,
                                    data: val,
                                    file: data.id,
                                    row: row
                                })
                            }, 10);
                        });

                        dataContext$.next({
                            ...another,
                            fileData: data,
                        });
                    } catch (e) {
                        notificationsDispatcher().dispatch({
                            message: "Не удалось обновить таблицу данных. Перезагрузите страницу и попробуйте еще раз.",
                            type: "warning"
                        });
                    }
                },
            })
        ;

        /**
         * Эта подписка обновляет данные в перманентном хранилище, не меняя
         * ссылки на массивы. Это нужно для того, чтоб либа, которая использует
         * эти данные не сбрасывала настройки.
         */
        const persistedDataChanges = dataContext$.subscribe({
            next: store => {
                const {fileData: {data}} = store;
                data.forEach((row, i) => {
                    if (!this.persistedData[i]) {
                        this.persistedData[i] = [];
                    }

                    row.forEach((col, j) => {
                        this.persistedData[i][j] = col;
                    })
                })
            },
        });

        return () => {
            persistedDataChanges.unsubscribe();
            commandSubscription.unsubscribe();
            sendPositionSubscription.unsubscribe();
            dataChangeSubscription.unsubscribe();
        };
    }

    /**
     * Получение сохраненных данных для файла Excel. Эти данные меняются
     * только по значению. Ссылки на массивы сохраняются.
     */
    getPersistData(): string[][] {
        return this.persistedData;
    }

    /**
     * Получение текущей информации о файле Excel
     */
    getCurrentFileData(): LoadFileData {
        const {dataContext$} = this.pipes;

        return JSON.parse(JSON.stringify(dataContext$.getValue()))
    }
}