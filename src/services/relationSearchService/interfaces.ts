import {Schemas} from "../../settings/schema";
import {SearchUntypedLoaderItem} from "../searchUntypedLoader/interfaces";
import {ChooseVariant, RelationFilterFieldConfiguration} from "../listDataLoader/filterLoader/types";

// Тип, описывающий поле схемы сущностей GraphQL
type Field<T extends keyof Schemas> = keyof Schemas[T]["fields"]

// Интерфейс параметров поиска сущностей
export interface RelationSearchServiceParams<T extends keyof Schemas> {
    searchPhrase: string
    searchEntityType: string
    schema: T
    primaryKey: Field<T>
    fieldsToLoad: Field<T>[]
    id: string
}

// Интерфейс параметров загрузки сущностей по первичному ключу
export interface RelationLoadParams<T extends keyof Schemas> {
    schema: T
    primaryKey: Field<T>
    fieldsToLoad: Field<T>[]
    primaryKeyValue: any[]
    id: string
}

// Результат выполнения запроса поиска
export type Result<T extends keyof Schemas> = {
    items: SearchUntypedLoaderItem<T>[]
    id: string
}

/**
 * Поиск сущностей по переданным параметрам
 */
export interface RelationSearchServiceInterface<T extends keyof Schemas> {
    /**
     * Поиск сущностей по переданным параметрам
     * @param params
     */
    SearchEntities(params: RelationSearchServiceParams<T>): Promise<Result<T>>

    /**
     * Загрузка списка сущностей по переданным ID
     * @param params
     */
    LoadEntitiesByPrimaryKey(params: RelationLoadParams<T>): Promise<Result<T>>

    /**
     * Поиск сущностей по переданным параметрам
     * @param searchString
     * @param configuration
     */
    searchRelationsBySearchString<
        T extends keyof Schemas,
        F extends keyof Schemas[T]['fields'],
    >(
        searchString: string,
        configuration: RelationFilterFieldConfiguration<T, F, any>
    ): Promise<ChooseVariant[]>;
}