import {Handler} from "./Handler";
import {ReduxAction} from "../../../system/ReduxAction";
import {ActionHandler} from "./ActionHandler";
import {AvailableAction, ReduxActionTypes} from "../../../ReduxStore";
import {Logger, LoggerFactory} from "../../../../services/logger/Logger";
import {loggerFactory} from "../../../../services/logger";

export type HandlersCollection<Store> = { [T in keyof ReduxActionTypes]: ActionHandler<Store, T> }

/**
 * Коллекция обработчиков событий Redux store.
 */
class HandlerCollection<Store> implements Handler<Store> {

    private readonly handlers: Partial<HandlersCollection<Store>>;
    private readonly logger: Logger;

    /**
     * Конструктор коллекции обработчиков событий Redux store
     *
     * @param handlers
     * @param loggerFactory
     */
    constructor(handlers: Partial<HandlersCollection<Store>>, loggerFactory: LoggerFactory) {
        this.handlers = handlers;
        this.logger = loggerFactory.make("HandlerCollection");
    }

    /**
     * Базовый обработчик хранилища
     *
     * @param store
     * @param action
     */
    handle<T extends AvailableAction>(store: Store, action: ReduxAction<T>): Store {
        let result = {...JSON.parse(JSON.stringify(store))};

        const handler = this.handlers[action.type];
        if (handler !== undefined) {
            // @ts-ignore
            result = JSON.parse(JSON.stringify(handler.handle(store, action.payload)))

            this.logger.Debug(action, store, result);
        }

        return result;
    }
}

export const Handlers = <Store>(handlers: Partial<HandlersCollection<Store>>): Handler<Store> => {
    return new HandlerCollection(
        handlers,
        loggerFactory(),
    )
};
