import {Schemas} from "../../settings/schema";

// Конфигурация отношения
export type RelationConfiguration<S extends keyof Schemas> = {
    relatedEntityCode: string
    relatedEntitySchema: S
    fieldsToLoad: (keyof Schemas[S]['fields'])[]
};

// Тип найденной сущности
export type SearchItem<S extends keyof Schemas> = {
    [T in keyof Schemas[S]['fields']]: any
}

/**
 * Сервис для поиска целевых сущностей по переданным параметрам
 */
export interface EntitySearchServiceInterface {
    /**
     * Поиск сущностей с поддержкой фонетики
     * @param searchString
     * @param relationParameters
     */
    phoneticSearch<S extends keyof Schemas>(
        searchString: string,
        relationParameters: RelationConfiguration<S>
    ): Promise<SearchItem<S>[]>
}