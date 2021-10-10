import {ActionHandler} from "../system/ActionHandler";
import {EntityEdit} from "../../../stores/EntityEdit";
import {DefaultEntityEdit} from "../../defaults";

// Обработка сброса Store при авторизации
export class ResetEditStoreHandler implements ActionHandler<EntityEdit, "ENTITY_EDIT_RESET_STORE"> {
    handle(): EntityEdit {
        return {...new DefaultEntityEdit()};
    }
}