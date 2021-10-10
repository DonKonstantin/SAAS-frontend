import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Editor, LoadFileData, WsMessage} from "../type";
import Handsontable from "handsontable";

// Пайпы для работы файла Excel
export type ExcelFilePipelines = {
    dataContext$: BehaviorSubject<LoadFileData>                     // Контекст данных файла
    sendChangesContext$: Subject<Handsontable.CellChange>           // Контекст отправки изменений на сервер
    sendPositionContext$: Subject<{ row: number, col: number }>     // Контекст отправки изменений положения на сервер
    commandProcessContext$: Subject<WsMessage>                      // Контекст обработки сообщений от сервера
}

// Интерфейс сущности Excel файла
export interface ExcelFileInterface {
    // Подписка на обновления данных файла
    getFileData(): Observable<LoadFileData>

    // Получение пользователя, находящегося на запрошенной ячейке
    getUserThatSelectCell(row: number, col: number): Editor | undefined

    // Обработка изменения данных
    onChangeData(changes: Handsontable.CellChange[]): void

    // Обработка изменения позиционирования пользователя на файле
    onChangePosition(row: number, col: number): void

    // Метод должен вызываться перед окончанием работы над файлом
    onClose(): void

    // Получение сохраненных данных для файла Excel. Эти данные меняются
    // только по значению. Ссылки на массивы сохраняются.
    getPersistData(): string[][]

    // Получение текущей информации о файле Excel
    getCurrentFileData(): LoadFileData
}
