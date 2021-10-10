import {Schemas} from "../../settings/schema";
import {EntityData} from "../../services/entityGetterService/interface";
import {PageUrl} from "../../settings/pages/system/list";
import {ValidationResult} from "../../settings/pages/system/edit";
import {AdditionEditParams} from "../../containers/EntityEdit";

// Интерфейс хранилища данных формы редактирования сущности
export interface EntityEdit {
    primaryKey: any
    schema: keyof Schemas
    data: EntityData<keyof Schemas>
    isLoading: boolean
    isChangeInProgress: boolean
    redirectTo: PageUrl | undefined
    validationResults: ValidationResult[][]
    additionEditParams: AdditionEditParams
}

// Зарегистрированные типы событий для хранилища
export interface EntityEditActionTypes {
    ENTITY_EDIT_NEED_RELOAD_DATA: {schema: keyof Schemas, primaryKey: any, additionEditParams: AdditionEditParams}
    ENTITY_EDIT_CHANGE_LOADING_STATE: boolean
    ENTITY_EDIT_STORE_LOADED_DATA: {schema: keyof Schemas, primaryKey: any, data: EntityData<keyof Schemas>}
    ENTITY_EDIT_DATA_CHANGED: EntityData<keyof Schemas>
    ENTITY_EDIT_RESET_STORE: undefined
    ENTITY_EDIT_SAVE_ENTITY: {isNeedCopy: boolean, isNeedClose: boolean, entityData: EntityData<keyof Schemas>, additionEditParams: AdditionEditParams}
    ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE: boolean
    ENTITY_EDIT_SET_REDIRECT_TO: PageUrl | undefined
    ENTITY_EDIT_CHANGE_VALIDATION_RESULTS: ValidationResult[][]
}