import {ActionHandler} from "../system/ActionHandler";
import {EntityList} from "../../../stores/EntityList";
import {ReduxActionTypes} from "../../../ReduxStore";

/**
 * Изменение глобального состояния загрузки листинга сущностей
 */
export class ChangeGlobalLoadingHandler implements ActionHandler<EntityList, "ENTITY_LIST_CHANGE_GLOBAL_LOADING_STATE"> {
    handle(store: EntityList, payload: ReduxActionTypes["ENTITY_LIST_CHANGE_GLOBAL_LOADING_STATE"]): EntityList {
        return {
            ...store,
            isLoading: payload
        };
    }
}