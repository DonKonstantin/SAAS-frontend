import {BehaviorSubject} from "rxjs";
import {LoadFileData, WsMessage} from "../../type";

// Обработчик команд от WS сервиса
export interface CommandReceiverInterface {
    // Обработка команды от WS сервиса
    ProcessCommand(dataContext$: BehaviorSubject<LoadFileData>, cmd: WsMessage): void
}

// Процессор команд от WS сервиса
export interface CommandProcessorInterface {
    // Проверка доступности процессора команды
    IsAvailable(cmd: WsMessage): boolean

    // Обработка команды от WS сервиса
    ProcessCommand(dataContext$: BehaviorSubject<LoadFileData>, cmd: WsMessage): void
}