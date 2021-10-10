import {Authorization, AuthorizationActionTypes} from "./stores/Authorization";
import {EntityList, EntityListActionTypes} from "./stores/EntityList";
import {EntityEdit, EntityEditActionTypes} from "./stores/EntityEdit";
import {Debug, DebugActionTypes} from "./stores/Debug";
import {LanguagesStore, LanguagesStoreActionTypes} from "./stores/Languages";
import {RouteCalculationStore, RouteCalculationStoreActionTypes} from "./stores/RouteCalculationStore";

// Интерфейс хранилища Redux
export interface ReduxStore {
    Authorization: Authorization,
    EntityList: EntityList,
    EntityEdit: EntityEdit,
    Debug: Debug
    LanguagesStore: LanguagesStore,
    RouteCalculation: RouteCalculationStore,
}

// Регистрация всех доступных в системе событий
export type AvailableAction = keyof ReduxActionTypes;
export type ReduxActionTypes = {}
    & AuthorizationActionTypes
    & EntityListActionTypes
    & EntityEditActionTypes
    & DebugActionTypes
    & LanguagesStoreActionTypes
    & RouteCalculationStoreActionTypes
;
