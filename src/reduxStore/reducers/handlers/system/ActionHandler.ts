/**
 * Интерфейс обработчика событий Redux
 */
import {AvailableAction, ReduxActionTypes} from "../../../ReduxStore";

export interface ActionHandler<Store, Action extends AvailableAction> {
    // Обработка события
    handle(store: Store, payload: ReduxActionTypes[Action]): Store;
}
