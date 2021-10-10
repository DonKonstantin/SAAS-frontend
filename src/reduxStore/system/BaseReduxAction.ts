import {ReduxAction} from "./ReduxAction";
import {AvailableAction, ReduxActionTypes} from "../ReduxStore";

/**
 * Базовая реализация события Redux
 */
class BaseReduxAction<T extends AvailableAction> implements ReduxAction<T> {
    readonly payload: ReduxActionTypes[T];
    type: T;

    /**
     * Конструктор события
     *
     * @param payload
     * @param type
     */
    constructor(payload: ReduxActionTypes[T], type: T) {
        this.payload = payload;
        this.type = type;
    }
}

export type ReduxActionFactory = {<T extends AvailableAction>(type: T, payload: ReduxActionTypes[T]): ReduxAction<T>};
export const ReduxActionFactoryCallback: ReduxActionFactory =
    <T extends AvailableAction>(
        type: T,
        payload: ReduxActionTypes[T],
    // @ts-ignore
    ): ReduxAction<T> => ({...(new BaseReduxAction<T>(payload, type))});
