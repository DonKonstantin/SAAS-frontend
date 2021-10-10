import {ActionHandler} from "../system/ActionHandler";
import {EntityEdit} from "../../../stores/EntityEdit";
import {ReduxActionTypes} from "../../../ReduxStore";

// Обработчик изменения состояния флага изменений
export class ChangeInProgressStateChangeHandler implements ActionHandler<EntityEdit, "ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE"> {
    handle(store: EntityEdit, payload: ReduxActionTypes["ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE"]): EntityEdit {
        return {
            ...store,
            isChangeInProgress: payload
        };
    }
}