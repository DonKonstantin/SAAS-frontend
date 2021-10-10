import {ActionHandler} from "../system/ActionHandler";
import {EntityList} from "../../../stores/EntityList";
import {ReduxActionTypes} from "../../../ReduxStore";

/**
 * Изменение состояния загрузки листинга сущностей
 */
export class ChangeListReloadingStateHandler implements ActionHandler<EntityList, "ENTITY_LIST_CHANGE_LIST_RELOADING_STATE"> {
    handle(store: EntityList, payload: ReduxActionTypes["ENTITY_LIST_CHANGE_LIST_RELOADING_STATE"]): EntityList {
        return {
            ...store,
            isListReloading: payload
        };
    }
}