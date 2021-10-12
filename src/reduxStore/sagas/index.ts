import {RegisteredSagas} from "./system/SagasCollection";
import {LoadSchemaBaseDataSaga} from "./entityList/LoadSchemaBaseDataSaga";
import {ReloadEntitiesListDataSaga} from "./entityList/ReloadEntitiesListDataSaga";
import {RemoveEntitiesSaga} from "./entityList/RemoveEntitiesSaga";
import {EntityEditReloadSaga} from "./entityEdit/EntityEditReloadSaga";
import {EntityEditStoreSaga} from "./entityEdit/EntityEditStoreSaga";
import {ProcessEntityChangesForEntitiesList} from "./entityList/ProcessEntityChangesForEntitiesList";

/**
 * Список зарегистрированных в системе саг
 */
export const sagas: RegisteredSagas = {
    ENTITY_LIST_NEED_LOAD_SCHEMA_BASE_DATA: new LoadSchemaBaseDataSaga(),
    ENTITY_LIST_STORE_CHANGE_SCHEMA_DATA: new ReloadEntitiesListDataSaga(),
    ENTITY_LIST_REMOVE_ENTITIES: new RemoveEntitiesSaga(),
    ENTITY_LIST_PROCESS_DATA_CHANGES_BY_WSS: new ProcessEntityChangesForEntitiesList(),
    ENTITY_EDIT_NEED_RELOAD_DATA: new EntityEditReloadSaga(),
    ENTITY_EDIT_SAVE_ENTITY: new EntityEditStoreSaga(),
};
