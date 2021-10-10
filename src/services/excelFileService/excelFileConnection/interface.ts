import {Observable} from "rxjs";
import {AvailableCommands, WsMessage} from "../type";

// Канал обмена сообщениями с WS сервером
export interface ExcelFileConnectionInterface {
    // Прием сообщений от WS сервера
    ReceiveMessages(): Observable<WsMessage>

    // Доставка команды на сервер WS
    DispatchCommand<T extends keyof AvailableCommands>(command: T, data: AvailableCommands[T])

    // Обработка отключения от WS сервера
    Disconnect(): void
}