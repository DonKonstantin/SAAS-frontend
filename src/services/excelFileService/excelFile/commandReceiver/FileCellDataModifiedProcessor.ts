import {CommandProcessorInterface} from "./interface";
import {BehaviorSubject} from "rxjs";
import {FileData, LoadFileData, WsCommand, WsMessage} from "../../type";

// Процессор для обработки изменения значения ячейки
export class FileCellDataModifiedProcessor implements CommandProcessorInterface {
    /**
     * Проверка доступности процессора команды
     * @param cmd
     */
    IsAvailable(cmd: WsMessage): boolean {
        return cmd.type === "Success"
            && !!cmd.data
            && cmd.data.type === "FileCellDataModified"
        ;
    }

    /**
     * Обработка команды от WS сервиса
     * @param dataContext$
     * @param cmd
     */
    ProcessCommand(dataContext$: BehaviorSubject<LoadFileData>, cmd: WsMessage): void {
        const {fileData, ...another} = dataContext$.getValue();
        const {data: cmdData} = cmd.data as WsCommand<"FileCellDataModified">;

        if (fileData.id !== cmdData.file) {
            return
        }

        const newData: FileData = JSON.parse(JSON.stringify(fileData));
        if (!newData.data[cmdData.row]) {
            newData.data[cmdData.row] = [];
        }

        newData.data[cmdData.row][cmdData.col] = cmdData.data;

        dataContext$.next({
            ...another,
            fileData: newData,
        });
    }
}