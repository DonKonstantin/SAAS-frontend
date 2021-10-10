import {ReduxAction} from "../system/ReduxAction";
import {AvailableAction} from "../ReduxStore";

/**
 * Интерфейс редьюсера для Redux
 */
export interface Reducer<S extends object> {
    reduce<T extends AvailableAction>(store: S, action: ReduxAction<T>): S
}
