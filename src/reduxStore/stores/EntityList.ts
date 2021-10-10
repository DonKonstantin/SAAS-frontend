import {Schemas} from "../../settings/schema";
import {ListLoadingParameters} from "../../services/listDataLoader/listLoader/interfaces";
import {BaseData} from "../../services/listDataLoader/interfaces";
import {ListFieldRow, ListResponse} from "../../services/listDataLoader/listLoader/types";

// Загруженный листинг сущностей
export interface ListOfSchema<T extends keyof Schemas> {
    schema: T
    baseConfiguration: ListLoadingParameters<T>
    baseData: BaseData<T>
    currentData: ListResponse<T>
}

// Уже загруженные листинги
export type LoadedSchemas = {[P in keyof Schemas]?: ListOfSchema<P>}

// Интерфейс хранилища данных листинга пользователей
export interface EntityList {
    loaded: LoadedSchemas
    isLoading: boolean
    isListReloading: boolean
    isChangeInProgress: boolean
}

// Интерфейс типов событий для данного хранилища
export interface EntityListActionTypes {
    ENTITY_LIST_NEED_LOAD_SCHEMA_BASE_DATA: {schema: keyof Schemas, additionFilter: {[T: string]: string}}
    ENTITY_LIST_CHANGE_GLOBAL_LOADING_STATE: boolean
    ENTITY_LIST_STORE_LOADED_SCHEMA_BASE_DATA: {schema: keyof Schemas, data: ListOfSchema<any>}
    ENTITY_LIST_STORE_CHANGE_SCHEMA_DATA: {schema: keyof Schemas, data: ListOfSchema<any>}
    ENTITY_LIST_CHANGE_LIST_RELOADING_STATE: boolean
    ENTITY_LIST_STORE_UPDATED_SCHEMA_DATA: {schema: keyof Schemas, data: ListOfSchema<any>}
    ENTITY_LIST_STORE_RESET: undefined
    ENTITY_LIST_REMOVE_ENTITIES: {data: ListOfSchema<any>, items: any[]}
    ENTITY_LIST_SET_CHANGE_IN_PROGRESS_STATE: boolean
    ENTITY_LIST_DROP_OUTDATED_SCHEMAS_WITHOUT_PASSED: (keyof Schemas)[]
    ENTITY_LIST_PROCESS_DATA_CHANGES_BY_WSS: WssChangesData<keyof Schemas>
}

// Тип, описывающий данные события изменения данных схемы по WSS
export type WssChangesData<T extends keyof Schemas> = {
    data: ListOfSchema<T>,
    eventType: "updated" | "deleted",
    changedRow: ListFieldRow<T>,
}