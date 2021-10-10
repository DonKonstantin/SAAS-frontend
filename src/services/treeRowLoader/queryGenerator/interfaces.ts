import {Schemas} from "../../../settings/schema";
import {ListFieldRow} from "../../listDataLoader/listLoader/types";

// Результат базового запроса
export type QueryRow<T extends keyof Schemas> = {[P in keyof Schemas[T]['fields']]: any}
export type RowResult<T extends keyof Schemas> = {
    [P in T]: QueryRow<T>[]
}

/**
 * Сервис генерации основного запроса листинга сущностей и парсинга результатов элементов дерева сущностей
 */
export interface QueryGeneratorInterface {
    /**
     * Генерация запроса листинга сущностей
     * @param schema
     * @param primaryKeyValues
     */
    GenerateQuery<T extends keyof Schemas>(schema: T, primaryKeyValues: any[]): string

    /**
     * Генерация листинга значений по данным базового запроса
     * @param schema
     * @param rowResult
     */
    GenerateValuesByRowResult<T extends keyof Schemas>(
        schema: T,
        rowResult: RowResult<T>
    ): Promise<ListFieldRow<T>[]>
}