import {ActionHandler} from "../system/ActionHandler";
import {EntityList, ListOfSchema} from "../../../stores/EntityList";
import {ReduxActionTypes} from "../../../ReduxStore";

/**
 * Изменение состояния загрузки листинга сущностей
 */
export class StoreUploadedSchemaDataHandler implements ActionHandler<EntityList, "ENTITY_LIST_STORE_UPDATED_SCHEMA_DATA"> {
    handle(store: EntityList, payload: ReduxActionTypes["ENTITY_LIST_STORE_UPDATED_SCHEMA_DATA"]): EntityList {
        const newStore: EntityList = JSON.parse(JSON.stringify(store));
        newStore.isListReloading = false;
        newStore.loaded[payload.schema] = JSON.parse(JSON.stringify(payload.data));

        // @ts-ignore
        const storeSchema: ListOfSchema<any> = newStore.loaded[payload.schema];
        if (!storeSchema.currentData.count && storeSchema.currentData.count !== 0) {
            storeSchema.currentData.count = store.loaded[payload.schema]?.currentData.count || 0
        }

        return newStore
    }
}