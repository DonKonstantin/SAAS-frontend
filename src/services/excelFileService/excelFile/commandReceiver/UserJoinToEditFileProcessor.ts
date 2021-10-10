import {CommandProcessorInterface} from "./interface";
import {LoadFileData, WsCommand, WsMessage} from "../../type";
import {BehaviorSubject} from "rxjs";

// Процессор для обработки подключения нового пользователя
export class UserJoinToEditFileProcessor implements CommandProcessorInterface {
    /**
     * Проверка доступности процессора команды
     * @param cmd
     */
    IsAvailable(cmd: WsMessage): boolean {
        return cmd.type === "Success"
            && !!cmd.data
            && cmd.data.type === "UserJoinToEditFile"
            ;
    }

    /**
     * Обработка команды от WS сервиса
     * @param dataContext$
     * @param cmd
     */
    ProcessCommand(dataContext$: BehaviorSubject<LoadFileData>, cmd: WsMessage): void {
        const {data: cmdData} = cmd.data as WsCommand<"UserJoinToEditFile">;
        const {fileData, editors, editorsPosition} = dataContext$.getValue();

        if (fileData.id !== cmdData.file) {
            return
        }

        dataContext$.next({
            ...dataContext$.getValue(),
            editors: [...editors, cmdData.editor],
            editorsPosition: [...editorsPosition, cmdData.position],
        })
    }
}