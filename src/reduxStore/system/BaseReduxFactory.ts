import {ReduxFactory} from "./ReduxFactory";
import {AvailableAction, ReduxStore} from "../ReduxStore";
import {ReduxAction} from "./ReduxAction";
import {DeepPartial, Reducer, Store} from "redux";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import {setGlobalStore} from "./index";
import {rootSagas} from "../sagas/system";
import {Logger, LoggerFactory} from "../../services/logger/Logger";

/**
 * Базовая реализация фабрики Redux Store
 */
export class BaseReduxFactory implements ReduxFactory {

    private readonly environment: string;
    private readonly logger: Logger;
    private readonly reducer: Reducer<ReduxStore, ReduxAction<AvailableAction>>;

    /**
     * Конструктор фабрики
     *
     * @param loggerFactory
     * @param environment
     * @param reducer
     */
    constructor(
        loggerFactory: LoggerFactory,
        environment: string,
        reducer: Reducer<ReduxStore, ReduxAction<AvailableAction>>
    ) {
        this.environment = environment;
        this.logger = loggerFactory.make("ReduxFactory");
        this.reducer = reducer;
    }

    /**
     * Создание стора
     *
     * @param initialState
     */
    make(initialState: DeepPartial<ReduxStore>): Store<ReduxStore, ReduxAction<AvailableAction>> {
        const saga = createSagaMiddleware();

        let middleware = applyMiddleware(saga);
        if ("prod" !== this.environment) {
            middleware = composeWithDevTools(middleware);
        }

        // @ts-ignore
        const store = createStore(this.reducer, initialState, middleware);

        saga.run(rootSagas);

        // @ts-ignore
        setGlobalStore(store);
        this.logger.Debug("Created new store", store.getState());

        return store;
    }
}
