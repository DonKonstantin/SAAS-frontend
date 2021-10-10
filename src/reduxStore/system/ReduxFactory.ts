import {DeepPartial, Store} from "redux";
import {AvailableAction, ReduxStore} from "../ReduxStore";
import {ReduxAction} from "./ReduxAction";

/**
 * Интерфейс фабрики Redux стора
 */
export interface ReduxFactory {
    // Создание стора
    make(initialState: DeepPartial<ReduxStore>): Store<ReduxStore, ReduxAction<AvailableAction>>
}
