import {Schemas} from "../../settings/schema";

export interface LoadParameters<T extends keyof Schemas> {
    schema: T,
    primaryKey: keyof Schemas[T]['fields'],
    captionFields: (keyof Schemas[T]['fields'])[],
}

/**
 * Сервис загрузки данных для полей отношений
 */
export interface RelationVariantsDataLoaderInterface {
    /**
     * Загружает варианты отображения полей отношений
     * @param params
     */
    Load(params: LoadParameters<keyof Schemas>): Promise<any[]>
}