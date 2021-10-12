import {ReduxStore} from "../../ReduxStore";
import {Handler} from "./system/Handler";
import {Handlers} from "./system/HandlerCollection";
import {ChangeGlobalLoadingHandler} from "./entityList/ChangeGlobalLoadingHandler";
import {StoreLoadedBaseDataHandler} from "./entityList/StoreLoadedBaseDataHandler";
import {ChangeListReloadingStateHandler} from "./entityList/ChangeListReloadingStateHandler";
import {StoreUploadedSchemaDataHandler} from "./entityList/StoreUploadedSchemaDataHandler";
import {ResetStoreHandler} from "./entityList/ResetStoreHandler";
import {ChangesInProgressStatusChangeHandler} from "./entityList/ChangesInProgressStatusChangeHandler";
import {RemoveOutdatedSchemasHandler} from "./entityList/RemoveOutdatedSchemasHandler";
import {ChangeEntityEditLoadingStateHandler} from "./entityEdit/ChangeEntityEditLoadingStateHandler";
import {StoreEntityEditLoadedDataHandler} from "./entityEdit/StoreEntityEditLoadedDataHandler";
import {ChangeEntityEditDataHandler} from "./entityEdit/ChangeEntityEditDataHandler";
import {ResetEditStoreHandler} from "./entityEdit/ResetEditStoreHandler";
import {SetRedirectToHandler} from "./entityEdit/SetRedirectToHandler";
import {ChangeInProgressStateChangeHandler} from "./entityEdit/ChangeInProgressStateChangeHandler";
import {ChangeValidationResultsHandler} from "./entityEdit/ChangeValidationResultsHandler";
import {DebugChangeStateHandler} from "./debug/DebugChangeStateHandler";

/**
 * Зарегистрированные в системе обработчики событий Redux
 */
export const handlers: HandlersList = {
    EntityEdit: Handlers({
        ENTITY_EDIT_CHANGE_LOADING_STATE: new ChangeEntityEditLoadingStateHandler(),
        ENTITY_EDIT_STORE_LOADED_DATA: new StoreEntityEditLoadedDataHandler(),
        ENTITY_EDIT_DATA_CHANGED: new ChangeEntityEditDataHandler(),
        ENTITY_EDIT_RESET_STORE: new ResetEditStoreHandler(),
        ENTITY_EDIT_SET_REDIRECT_TO: new SetRedirectToHandler(),
        ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE: new ChangeInProgressStateChangeHandler(),
        ENTITY_EDIT_CHANGE_VALIDATION_RESULTS: new ChangeValidationResultsHandler(),
    }),
    EntityList: Handlers({
        ENTITY_LIST_CHANGE_GLOBAL_LOADING_STATE: new ChangeGlobalLoadingHandler(),
        ENTITY_LIST_STORE_LOADED_SCHEMA_BASE_DATA: new StoreLoadedBaseDataHandler(),
        ENTITY_LIST_CHANGE_LIST_RELOADING_STATE: new ChangeListReloadingStateHandler(),
        ENTITY_LIST_STORE_UPDATED_SCHEMA_DATA: new StoreUploadedSchemaDataHandler(),
        ENTITY_LIST_STORE_RESET: new ResetStoreHandler(),
        ENTITY_LIST_SET_CHANGE_IN_PROGRESS_STATE: new ChangesInProgressStatusChangeHandler(),
        ENTITY_LIST_DROP_OUTDATED_SCHEMAS_WITHOUT_PASSED: new RemoveOutdatedSchemasHandler(),
    }),
    Debug: Handlers({
        DEBUG_CHANGE_STATE: new DebugChangeStateHandler(),
    }),
};

// Тип, описывающий коллекцию обработчиков событий хранилища Redux
export type HandlersList = { [item in keyof ReduxStore]: Handler<ReduxStore[item]> }
