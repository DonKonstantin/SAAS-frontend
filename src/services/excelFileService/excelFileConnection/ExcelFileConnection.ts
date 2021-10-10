import {ExcelFileConnectionInterface} from "./interface";
import {AvailableCommands, WsMessage} from "../type";
import {Observable, Subject} from "rxjs";

// Канал обмена сообщениями с WS сервером
export class ExcelFileConnection implements ExcelFileConnectionInterface {
    private readonly webSocket: WebSocket;
    private readonly subject$: Subject<WsMessage>;

    /**
     * Конструктор канала
     * @param endpoint
     */
    constructor(endpoint: string) {
        this.webSocket = new WebSocket(endpoint);
        if (!this.webSocket) {
            throw new Error(`Failed to connect to WS server`)
        }

        this.subject$ = new Subject<WsMessage>();
        this.webSocket.onmessage = message => {
            const data: WsMessage = JSON.parse(message.data);

            this.subject$.next(data)
        };
    }

    /**
     * Доставка команды на сервер WS
     * @param command
     * @param data
     */
    DispatchCommand<T extends keyof AvailableCommands>(command: T, data: AvailableCommands[T]) {
        const cmdData = {
            parameters: JSON.stringify(data),
            command: command
        };

        this.readConnection().then(() => {
            this.webSocket.send(JSON.stringify(cmdData))
        });
    }

    /**
     * Прием сообщений от WS сервера
     */
    ReceiveMessages(): Observable<WsMessage> {
        return this.subject$.asObservable()
    }

    /**
     * Обработка отключения от WS сервера
     */
    Disconnect(): void {
        this.webSocket.close();
        this.subject$.complete();
    }

    /**
     * Ожидание подключения пользователя к шине
     */
    private readConnection(): Promise<void> {
        return new Promise<void>(resolve => {
            if (this.webSocket.readyState === 1) {
                resolve();

                return
            }

            setTimeout(async () => {
                await this.readConnection();

                resolve();
            }, 10)
        })
    }
}