import {ActionHandler} from "../system/ActionHandler";
import {EntityList} from "../../../stores/EntityList";
import {ReduxActionTypes} from "../../../ReduxStore";

/**
 * Обработчик изменения состояния флага обработки изменений
 */
export class ChangesInProgressStatusChangeHandler implements ActionHandler<EntityList, "ENTITY_LIST_SET_CHANGE_IN_PROGRESS_STATE"> {
    handle(store: EntityList, payload: ReduxActionTypes["ENTITY_LIST_SET_CHANGE_IN_PROGRESS_STATE"]): EntityList {
        return {
            ...store,
            isChangeInProgress: payload,
        };
    }
}