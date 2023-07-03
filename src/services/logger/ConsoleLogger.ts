import {Logger} from "./Logger";

type ConsoleCallback = {(message?: any, ...optionalParams: any[]): void}

/**
 * Реализация системного логгера с использованием стандартной системной консоли.
 */
export class ConsoleLogger implements Logger {

    private readonly isDebugEnabled: boolean;
    private readonly console: Console;
    private readonly module: string;
    private readonly colors = {
        Debug: "#787878",
        Error: "#e90024",
        Info: "#75af1d",
        Notice: "#8b46d1",
        Warning: "#e1dd00"
    };

    /**
     * Конструктор логгера
     *
     * @param console
     * @param module
     * @param isDebugEnabled
     */
    constructor(console: Console, module: string, isDebugEnabled: boolean) {
        this.console = console;
        this.module = module;
        this.isDebugEnabled = isDebugEnabled;
    }

    Debug(...messages: any[]): void {
        if (false === this.isDebugEnabled) {
            return;
        }

        this.logToConsole(this.console.log, this.colors.Debug, ...messages)
    }

    Error(...messages: any[]): void {
        this.logToConsole(this.console.error, this.colors.Error, ...messages)
    }

    Info(...messages: any[]): void {
        this.logToConsole(this.console.info, this.colors.Info, ...messages)
    }

    Notice(...messages: any[]): void {
        this.logToConsole(this.console.log, this.colors.Notice, ...messages)
    }

    Warning(...messages: any[]): void {
        this.logToConsole(this.console.warn, this.colors.Warning, ...messages)
    }

    /**
     * Логирование данных в консоль. Первым параметром принимает функцию
     * обратного вызова, с помощью которой необходимо вывести основные строки
     *
     * @param callback
     * @param color
     * @param messages
     */
    private logToConsole(callback: ConsoleCallback, color: string, ...messages: any[]): void {
        const styles = color.length > 0 ? `color: ${color}` : ``;

        this.console.group(`%c%s`, styles, this.module);
        messages.map((message) => {
            let pattern = `%c%s`;
            if (typeof message !== "string") {
                pattern = `%c%o`;
            }

            callback(pattern, styles, message)
        });
        this.console.groupEnd();
    }
}
