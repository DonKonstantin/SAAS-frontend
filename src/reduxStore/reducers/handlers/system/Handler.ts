import {ReduxAction} from "../../../system/ReduxAction";
import {AvailableAction} from "../../../ReduxStore";

// Интерфейс обработчика событий
export interface Handler<Store> {
    // Обработка событий
    handle<T extends AvailableAction>(store: Store, action: ReduxAction<T>): Store;
}
