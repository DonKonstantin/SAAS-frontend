import {ActionHandler} from "../system/ActionHandler";
import {EntityEdit} from "../../../stores/EntityEdit";
import {ReduxActionTypes} from "../../../ReduxStore";

// Обработка изменения валидаций
export class ChangeValidationResultsHandler implements ActionHandler<EntityEdit, "ENTITY_EDIT_CHANGE_VALIDATION_RESULTS"> {
    handle(store: EntityEdit, payload: ReduxActionTypes["ENTITY_EDIT_CHANGE_VALIDATION_RESULTS"]): EntityEdit {
        return {
            ...store,
            validationResults: payload
        };
    }
}