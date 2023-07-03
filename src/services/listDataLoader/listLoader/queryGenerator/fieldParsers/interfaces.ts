import {ListFieldConfiguration, ListFieldValueTypes} from "../../types";
import {Schemas} from "../../../../../settings/schema";
import {QueryRow} from "../interfaces";

/**
 * Парсер значений поля
 */
export interface FieldParsersInterface<F extends keyof ListFieldValueTypes> {
    /**
     * Парсинг поля. Парсит значения из строки и подгружает доп. данные если они нужны
     * @param schema
     * @param config
     * @param rows
     */
    ParseField<T extends keyof Schemas, K extends keyof Schemas[T]["fields"]>(
        schema: T,
        config: ListFieldConfiguration<T, K>,
        rows: QueryRow<T>[],
    ): Promise<ListFieldValueTypes[F][]>
}