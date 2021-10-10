import {ReduxFactory} from "./ReduxFactory";
import {BaseReduxFactory} from "./BaseReduxFactory";
import {Reducers, registeredReducers} from "../reducers";
import getConfig from 'next/config';
import {Action, combineReducers, ReducersMapObject, Store} from "redux";
import {ReduxStore} from "../ReduxStore";
import {loggerFactory} from "../../services/logger";

/**
 * Глобальный Redux Store. В некоторых службах необходимо использование Store
 * для доступа к данным, а прокидывать в них Store через кучу компонентов не целесообразно,
 * в этом случа можно использовать глобальный Store для получения данных.
 *
 * Использовать прямую ссылку на объект не получится, т.к. она будет постоянно обновляться,
 * поэтому необходимо использовать обертку-фабрику.
 */
let globalStore: Store<ReduxStore, Action<any>>;
export function store(): Store<ReduxStore, Action<any>> {
    return globalStore;
}

/**
 * Глобальный сеттер для Redux Store.
 *
 * @param store
 */
export function setGlobalStore(store: Store<ReduxStore, Action<any>>): void {
    globalStore = store;
}

// Регистрируем обработчики для каждого Redux Store
type ReducersMap = ReducersMapObject<ReduxStore, any>;
const RootReducer = () => {
    const reducers = registeredReducers();
    // @ts-ignore
    let reducersMap: ReducersMap = Object.keys(reducers).reduce<ReducersMap>(
        (result: ReducersMap, reducer: keyof Reducers): ReducersMap => {
            return {
                ...result,
                // @ts-ignore
                [reducer]: (store, action) => reducers[reducer].reduce(store, action),
            }
        },
        // @ts-ignore
        {}
    )

    return combineReducers<ReduxStore>(reducersMap)
};

export const baseReduxFactory: {(): ReduxFactory} = () => {
    const {publicRuntimeConfig} = getConfig();
    return new BaseReduxFactory(
        loggerFactory(),
        publicRuntimeConfig.environment,
        RootReducer(),
    )
};
