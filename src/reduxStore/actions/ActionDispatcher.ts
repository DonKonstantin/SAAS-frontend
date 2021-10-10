import {AvailableAction, ReduxActionTypes} from "../ReduxStore";

// Сервис отправки события в Redux store
export interface ActionDispatcher {
    // Отправка события в Redux store
    dispatch<T extends AvailableAction>(type: T, payload: ReduxActionTypes[T]): void;
}

export type DispatcherFactory = {(): ActionDispatcher}
