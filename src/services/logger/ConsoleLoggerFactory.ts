import {Logger, LoggerFactory} from "./Logger";
import {ConsoleLogger} from "./ConsoleLogger";

/**
 * Фабрика консольных логгеров
 */
export class ConsoleLoggerFactory implements LoggerFactory {

    private readonly debug: boolean;

    /**
     * Конструктор службы
     *
     * @param debug
     */
    constructor(debug: boolean) {
        this.debug = debug;
    }

    /**
     * Создает логер и маркирует его переданным модулем
     *
     * @param module
     */
    make(module: string): Logger {
        return new ConsoleLogger(
            console,
            module,
            this.debug,
        );
    }
}
