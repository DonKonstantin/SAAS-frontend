import {ActionHandler} from "../system/ActionHandler";
import {EntityEdit} from "../../../stores/EntityEdit";
import {ReduxActionTypes} from "../../../ReduxStore";

// Обработчик сохранения загруженных данных
export class StoreEntityEditLoadedDataHandler implements ActionHandler<EntityEdit, "ENTITY_EDIT_STORE_LOADED_DATA"> {
    handle(store: EntityEdit, payload: ReduxActionTypes["ENTITY_EDIT_STORE_LOADED_DATA"]): EntityEdit {
        return {
            data: JSON.parse(JSON.stringify(payload.data)),
            isChangeInProgress: false,
            isLoading: false,
            primaryKey: payload.primaryKey,
            schema: payload.schema,
            redirectTo: undefined,
            validationResults: [],
            additionEditParams: store.additionEditParams,
        };
    }
}