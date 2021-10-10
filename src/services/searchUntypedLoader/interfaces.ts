import {Schemas} from "../../settings/schema";
import {Collection} from "../types";

// Тип, описывающий поле схемы сущностей GraphQL
type Field<T extends keyof Schemas> = keyof Schemas[T]["fields"]

// Интерфейс параметров получения списка не типизированных сущностей
export interface SearchUntypedLoaderParams<T extends keyof Schemas> {
    ids: any[]
    schema: T
    primaryKey: Field<T>
    fieldsToLoad: Field<T>[]
    localizedFields?: Field<T>[]
}

// Параметры получения перхвых 10 вариантов значений
export interface LoadFirstTenEntitiesParams<T extends keyof Schemas> {
    schema: T
    primaryKey: Field<T>
    fieldsToLoad: Field<T>[]
    localizedFields?: Field<T>[]
}

// Данные локализованного значения
export interface LocalizedFieldValue {
    id: string
    message: string
    langId: string
}

// Элемент не типизованной сущности
export type SearchUntypedLoaderItem<T extends keyof Schemas> = {
    localizedFields: Collection<LocalizedFieldValue[]>
    fields: {[P in Field<T>]: any}
}

/**
 * Сервис загрузки не типизированных сущностей
 */
export interface SearchUntypedLoaderInterface<T extends keyof Schemas> {
    /**
     * Загрузка не типизированных данных
     * @param params
     */
    LoadEntitiesById(params: SearchUntypedLoaderParams<T>): Promise<SearchUntypedLoaderItem<T>[]>

    /**
     * Загрузка первых 10 элементов
     * @param params
     */
    LoadFirstTenEntities(params: LoadFirstTenEntitiesParams<T>): Promise<SearchUntypedLoaderItem<T>[]>
}