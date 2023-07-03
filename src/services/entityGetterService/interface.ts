import {Schemas} from "../../settings/schema";
import {EntityValues} from "../../settings/pages/system/edit";

// Загруженные данные для сущности
export interface EntityData<T extends keyof Schemas = keyof Schemas> {
    primaryKey: any
    schema: T
    values: EntityValues<T>
    originalValues: EntityValues<T>
    additionData: { [F in keyof Schemas[T]['fields']]?: any }
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
     */
    GetEntity<T extends keyof Schemas>(schema: T, primaryKey: any): Promise<EntityData<T>>
}