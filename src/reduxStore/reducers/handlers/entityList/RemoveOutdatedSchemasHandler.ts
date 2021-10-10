import {ActionHandler} from "../system/ActionHandler";
import {EntityList} from "../../../stores/EntityList";
import {ReduxActionTypes} from "../../../ReduxStore";

/**
 * Обработчик удаления устаревших схем. По сути удаляет все схемы из загруженных, кроме переданных
 */
export class RemoveOutdatedSchemasHandler implements ActionHandler<EntityList, "ENTITY_LIST_DROP_OUTDATED_SCHEMAS_WITHOUT_PASSED"> {
    handle(store: EntityList, payload: ReduxActionTypes["ENTITY_LIST_DROP_OUTDATED_SCHEMAS_WITHOUT_PASSED"]): EntityList {
        let newStore: EntityList = JSON.parse(JSON.stringify(store))
        let newStoreCopy: EntityList = JSON.parse(JSON.stringify(store))
        newStore.loaded = {}

        payload.map(schema => {
            if (newStoreCopy.loaded[schema]) {
                // @ts-ignore
                newStore.loaded[schema] = newStoreCopy.loaded[schema]
            }
        })

        return newStore
    }
}