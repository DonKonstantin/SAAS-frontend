import {ActionHandler} from "../system/ActionHandler";
import {EntityEdit} from "../../../stores/EntityEdit";
import {ReduxActionTypes} from "../../../ReduxStore";
import {DefaultEntityEdit} from "../../defaults";

// Обработчик изменения страницы редиректа
export class SetRedirectToHandler implements ActionHandler<EntityEdit, "ENTITY_EDIT_SET_REDIRECT_TO"> {
    handle(_: EntityEdit, payload: ReduxActionTypes["ENTITY_EDIT_SET_REDIRECT_TO"]): EntityEdit {
        return {
            ...(new DefaultEntityEdit()),
            redirectTo: payload,
            isLoading: false,
            isChangeInProgress: false,
        };
    }
}