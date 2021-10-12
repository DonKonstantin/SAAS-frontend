import {EntityList, EntityListActionTypes} from "./stores/EntityList";
import {EntityEdit, EntityEditActionTypes} from "./stores/EntityEdit";
import {Debug, DebugActionTypes} from "./stores/Debug";

// Интерфейс хранилища Redux
export interface ReduxStore {
    EntityList: EntityList,
    EntityEdit: EntityEdit,
    Debug: Debug
}

// Регистрация всех доступных в системе событий
export type AvailableAction = keyof ReduxActionTypes;
export type ReduxActionTypes = {}
    & EntityListActionTypes
    & EntityEditActionTypes
    & DebugActionTypes
    ;
