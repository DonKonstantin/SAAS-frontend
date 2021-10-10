import {Reducer} from "./Reducer";
import {ReduxAction} from "../system/ReduxAction";
import {Handler} from "./handlers/system/Handler";
import {AvailableAction} from "../ReduxStore";

/**
 * Базовая реализация редьюсера хранилища Redux
 */
class ReducerWithHandler<Store extends object> implements Reducer<Store> {

    private readonly handler: Handler<Store>;
    private readonly defaultValue: Store;

    /**
     * Конструктор редьюсера
     *
     * @param handler
     * @param defaultValue
     */
    constructor(handler: Handler<Store>, defaultValue: Store) {
        this.handler = handler;
        this.defaultValue = defaultValue;
    }

    /**
     * Обработка событий хранилища
     *
     * @param store
     * @param action
     */
    reduce<T extends AvailableAction>(store: Store, action: ReduxAction<T>): Store {
        return this.handler.handle<T>(
            {...(store ? store : this.defaultValue)},
            action,
        );
    }
}

const handler = <Store extends object>(handler: Handler<Store>, defaultValue: Store): Reducer<Store> => {
    return new ReducerWithHandler(
        handler,
        defaultValue,
    )
};

export default handler;
