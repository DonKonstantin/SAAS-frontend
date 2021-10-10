import {ActionHandler} from "../system/ActionHandler";
import {EntityEdit} from "../../../stores/EntityEdit";
import {ReduxActionTypes} from "../../../ReduxStore";

// Обработчик изменения состояния флага загрузки данных сущности
export class ChangeEntityEditLoadingStateHandler implements ActionHandler<EntityEdit, "ENTITY_EDIT_CHANGE_LOADING_STATE"> {
    handle(store: EntityEdit, payload: ReduxActionTypes["ENTITY_EDIT_CHANGE_LOADING_STATE"]): EntityEdit {
        return {
            ...store,
            isLoading: payload
        };
    }
}