import {ActionHandler} from "../system/ActionHandler";
import {EntityList} from "../../../stores/EntityList";
import {ReduxActionTypes} from "../../../ReduxStore";

/**
 * Сохранение загруженных данных для схемы в Store
 */
export class StoreLoadedBaseDataHandler implements ActionHandler<EntityList, "ENTITY_LIST_STORE_LOADED_SCHEMA_BASE_DATA"> {
    handle(store: EntityList, payload: ReduxActionTypes["ENTITY_LIST_STORE_LOADED_SCHEMA_BASE_DATA"]): EntityList {
        return {
            ...store,
            isLoading: false,
            loaded: {
                ...store.loaded,
                [payload.schema]: {...payload.data}
            }
        };
    }
}