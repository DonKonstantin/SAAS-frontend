import {AlignRow, ListFieldConfiguration} from "../../../../services/listDataLoader/listLoader/types";
import {SchemaField, Schemas} from "../../../../settings/schema";

/**
 * Возвращает выравнивание ячейки по параметрам
 */
export default function columnDirection<T extends keyof Schemas, K extends keyof Schemas[T]["fields"]>(
    schema: T,
    fieldConfiguration: ListFieldConfiguration<T, K>
): AlignRow {
    const schemas = new Schemas()
    // @ts-ignore
    const field: SchemaField = schemas[schema].fields[fieldConfiguration.field]

    switch (field.type) {
        case "Boolean!":
            return "right"
        case "Boolean":
            return "right"
        case "DateTime!":
            return "right"
        case "DateTime":
            return "right"
        case "Int":
            return "right"
        case "Int!":
            return "right"
        case "Float":
            return "right"
        case "Float!":
            return "right"
        default:
            return "left"
    }
}