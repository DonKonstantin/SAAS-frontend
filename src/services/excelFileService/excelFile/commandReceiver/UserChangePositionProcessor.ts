import {CommandProcessorInterface} from "./interface";
import {BehaviorSubject} from "rxjs";
import {LoadFileData, WsCommand, WsMessage} from "../../type";

// Процессор для обработки изменения положения пользователя
export class UserChangePositionProcessor implements CommandProcessorInterface {
    /**
     * Проверка доступности процессора команды
     * @param cmd
     */
    IsAvailable(cmd: WsMessage): boolean {
        return cmd.type === "Success"
            && !!cmd.data
            && cmd.data.type === "UserChangePosition"
            ;
    }

    /**
     * Обработка команды от WS сервиса
     * @param dataContext$
     * @param cmd
     */
    ProcessCommand(dataContext$: BehaviorSubject<LoadFileData>, cmd: WsMessage): void {
        const {data: cmdData} = cmd.data as WsCommand<"UserChangePosition">;
        const {fileData, editorsPosition} = dataContext$.getValue();

        if (fileData.id !== cmdData.file) {
            return
        }

        dataContext$.next({
            ...dataContext$.getValue(),
            editorsPosition: editorsPosition
                .map(p => p.editor_id === cmdData.position.editor_id ? cmdData.position : p)
            ,
        })
    }
}