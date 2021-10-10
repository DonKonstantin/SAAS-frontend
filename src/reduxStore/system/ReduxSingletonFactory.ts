import {ReduxFactory} from "./ReduxFactory";
import {AvailableAction, ReduxStore} from "../ReduxStore";
import {ReduxAction} from "./ReduxAction";
import {DeepPartial, Store} from "redux";

/**
 * Фабрика Redux store, реализует Singleton Redux Store
 */
export class ReduxSingletonFactory implements ReduxFactory {

    private readonly STORE_KEY = `__NEXT_REDUX_STORE__`;
    private readonly baseReduxFactory: ReduxFactory;
    private readonly isServer: boolean;

    /**
     * Конструктор фабрики
     *
     * @param baseReduxFactory
     * @param isServer
     */
    constructor(baseReduxFactory: ReduxFactory, isServer: boolean) {
        this.baseReduxFactory = baseReduxFactory;
        this.isServer = isServer;
    }

    /**
     * Создание стора или получение имеющегося
     *
     * @param initialState
     */
    make(initialState: DeepPartial<ReduxStore>): Store<ReduxStore, ReduxAction<AvailableAction>> {
        if (this.isServer) {
            return this.bindStoreActions(this.baseReduxFactory.make(initialState));
        }

        if (window && !(`${this.STORE_KEY}` in window)) {
            return this.bindStoreActions(this.baseReduxFactory.make(initialState));
        }

        // @ts-ignore
        return this.bindStoreActions(window[this.STORE_KEY]);
    }

    /**
     * Регистрация дополнительных обработчиков для store
     * @param store
     */
    private bindStoreActions(store: Store<ReduxStore, ReduxAction<AvailableAction>>): Store<ReduxStore, ReduxAction<AvailableAction>> {
        return store
    }
}
