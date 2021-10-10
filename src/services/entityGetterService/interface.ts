import {Schemas} from "../../settings/schema";
import {EditPageConfiguration, EntityValues} from "../../settings/pages/system/edit";
import {AdditionEditParams} from "../../containers/EntityEdit";

// Загруженные данные для сущности
export interface EntityData<T extends keyof Schemas> {
    primaryKey: any
    schema: T
    values: EntityValues<T>
    originalValues: EntityValues<T>
    additionData: ((any | null)[])[]
    customComponentData: any
    configuration: EditPageConfiguration<T>
}

/**
 * Сервис загрузки данных сущности
 */
export interface EntityGetterServiceInterface {
    /**
     * Получение данных сущности для схемы
     *
     * @param schema
     * @param primaryKey
     * @param additionEditParams
     */
    GetEntity<T extends keyof Schemas>(schema: T, primaryKey: any, additionEditParams: AdditionEditParams): Promise<EntityData<T>>
}