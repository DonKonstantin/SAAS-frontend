import {CommandProcessorInterface} from "./interface";
import {BehaviorSubject} from "rxjs";
import {LoadFileData, WsCommand, WsMessage} from "../../type";

// Процессор для обработки загрузки данных файла
export class LoadFileDataProcessor implements CommandProcessorInterface {
    /**
     * Проверка доступности процессора команды
     * @param cmd
     */
    IsAvailable(cmd: WsMessage): boolean {
        return cmd.type === "Success"
            && !!cmd.data
            && cmd.data.type === "LoadFileData"
        ;
    }

    /**
     * Обработка команды от WS сервиса
     * @param dataContext$
     * @param cmd
     */
    ProcessCommand(dataContext$: BehaviorSubject<LoadFileData>, cmd: WsMessage): void {
        const {data: cmdData} = cmd.data as WsCommand<"LoadFileData">;

        // Реально данные приходят в объекте. Его надо преобразовать в массив
        const baseData = cmdData.fileData.data as { [T: number]: { [T: number]: string } };
        const excelData: string[][] = [];

        for (let rowIdx in baseData) {
            excelData[rowIdx] = [];
            for (let colIdx in baseData[rowIdx]) {
                excelData[rowIdx][colIdx] = baseData[rowIdx][colIdx]
            }
        }

        dataContext$.next({
            ...cmdData,
            fileData: {
                ...cmdData.fileData,
                data: excelData,
            },
        })
    }
}