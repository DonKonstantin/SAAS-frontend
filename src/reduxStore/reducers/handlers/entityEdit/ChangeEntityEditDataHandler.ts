import {ActionHandler} from "../system/ActionHandler";
import {EntityEdit} from "../../../stores/EntityEdit";
import {ReduxActionTypes} from "../../../ReduxStore";

// Обработчик сохранения изменений данных сущности
export class ChangeEntityEditDataHandler implements ActionHandler<EntityEdit, "ENTITY_EDIT_DATA_CHANGED"> {
    handle(store: EntityEdit, payload: ReduxActionTypes["ENTITY_EDIT_DATA_CHANGED"]): EntityEdit {
        return {
            ...store,
            data: JSON.parse(JSON.stringify(payload)),
            isLoading: false,
            isChangeInProgress: false,
        };
    }
}