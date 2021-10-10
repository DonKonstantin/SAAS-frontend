import {CommandProcessorInterface, CommandReceiverInterface} from "./interface";
import {BehaviorSubject} from "rxjs";
import {LoadFileData, WsMessage} from "../../type";

// Обработчик команд от WS сервиса
export class CommandReceiver implements CommandReceiverInterface {
    private readonly processors: CommandProcessorInterface[];

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(...processors: CommandProcessorInterface[]) {
        this.processors = processors
    }

    /**
     * Обработка команды от WS сервиса
     * @param dataContext$
     * @param cmd
     */
    ProcessCommand(dataContext$: BehaviorSubject<LoadFileData>, cmd: WsMessage): void {
        for (let processor of this.processors) {
            if (processor.IsAvailable(cmd)) {
                return processor.ProcessCommand(dataContext$, cmd)
            }
        }

        return;
    }
}