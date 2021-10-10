import {ReduxStore} from "../../ReduxStore";
import {Handler} from "./system/Handler";
import {Handlers} from "./system/HandlerCollection";
import {StoreAuthorizationHandler} from "./authorization/StoreAuthorizationHandler";
import {ResetAuthorization} from "./authorization/ResetAuthorization";
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
import {ChangePrimaryLanguagesHandler} from "./languages/ChangePrimaryLanguagesHandler";
import {ChangeSecondaryLanguagesHandler} from "./languages/ChangeSecondaryLanguagesHandler";
import {StoreReloadedLanguagesHandler} from "./languages/StoreReloadedLanguagesHandler";
import {ResetLanguagesHandler} from "./languages/ResetLanguagesHandler";
import {ChangeWidgetParameter} from "./routeCalculationStore/ChangeWidgetParameter";
import {StoreWidgetBaseData} from "./routeCalculationStore/StoreWidgetBaseData";
import {ChangeWidgetLoadingState} from "./routeCalculationStore/ChangeWidgetLoadingState";
import {ChangeStartTransportingCondition} from "./routeCalculationStore/ChangeStartTransportingCondition";

/**
 * Зарегистрированные в системе обработчики событий Redux
 */
export const handlers: HandlersList = {
    RouteCalculation: Handlers({
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_START_LOCATION: new ChangeWidgetParameter("startLocation"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_END_LOCATION: new ChangeWidgetParameter("endLocation"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_CONTAINER_ID: new ChangeWidgetParameter("containerId"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_CONTAINER_QUANTITY: new ChangeWidgetParameter("containerQuantity"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_EACH_CONTAINER_WEIGHT: new ChangeWidgetParameter("eachContainerWeight"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_PARAMETERS_TYPE: new ChangeWidgetParameter("parametersType"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_BASE_PARAMETERS: new ChangeWidgetParameter("baseParameters"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_PALLET_PARAMETERS: new ChangeWidgetParameter("palletParameters"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_VOLUME_PARAMETERS: new ChangeWidgetParameter("volumeParameters"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_START_TRANSPORTING_CONDITION: new ChangeStartTransportingCondition,
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_END_TRANSPORTING_CONDITION: new ChangeWidgetParameter("endTransportingCondition"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_NEED_CONTAINER_RENT: new ChangeWidgetParameter("isNeedContainerRent"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_DANGEROUS_CARGO: new ChangeWidgetParameter("isDangerousCargo"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_ARCHIVE_CALCULATION: new ChangeWidgetParameter("isArchiveCalculation"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_TARGET_CURRENCY_ID: new ChangeWidgetParameter("targetCurrencyId"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_NEED_LOGS: new ChangeWidgetParameter("isNeedLogs"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_NEED_PREKERIDGE: new ChangeWidgetParameter("isNeedPrekeridge"),
        ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_DATE: new ChangeWidgetParameter("date"),
        ROUTE_CALCULATION_STORE_WIDGET_BASE_DATA: new StoreWidgetBaseData(),
        ROUTE_CALCULATION_CHANGE_LOADING_STATE: new ChangeWidgetLoadingState(),
    }),
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
    Authorization: Handlers({
        AUTHORIZATION_STORE_AUTHORISATION: new StoreAuthorizationHandler(),
        AUTHORIZATION_RESET_STORE: new ResetAuthorization(),
    }),
    Debug: Handlers({
        DEBUG_CHANGE_STATE: new DebugChangeStateHandler(),
    }),
    LanguagesStore: Handlers({
        LANGUAGES_CHANGE_PRIMARY_LANG: new ChangePrimaryLanguagesHandler(),
        LANGUAGES_CHANGE_SECONDARY_LANG: new ChangeSecondaryLanguagesHandler(),
        LANGUAGES_STORE_RELOAD_LANGUAGES: new StoreReloadedLanguagesHandler(),
        LANGUAGES_NEED_RESET_LANGUAGES: new ResetLanguagesHandler(),
    })
};

// Тип, описывающий коллекцию обработчиков событий хранилища Redux
export type HandlersList = { [item in keyof ReduxStore]: Handler<ReduxStore[item]> }
