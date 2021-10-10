import {Action} from "redux";
import {AvailableAction, ReduxActionTypes} from "../ReduxStore";

/**
 * Интерфейс события Redux
 */
export interface ReduxAction<T extends AvailableAction> extends Action<T> {
    readonly payload: ReduxActionTypes[T]
}
