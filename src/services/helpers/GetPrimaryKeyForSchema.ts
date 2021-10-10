import {SchemaField, Schemas} from "../../settings/schema";

/**
 * Функция получения первичного ключа для переданной схемы
 * @param schema
 */
export default function getPrimaryKeyForSchema<T extends keyof Schemas>(schema: T): {code: keyof Schemas[T]['fields'], field: SchemaField} {
    const schemas = new Schemas();
    const primaryKeys = Object.keys(schemas[schema].fields).filter(key => schemas[schema].fields[key].isPrimaryKey);
    if (0 === primaryKeys.length) {
        throw new Error(`Schema ${schema} has not any primary key`)
    }

    return {
        code: primaryKeys[0],
        field: schemas[schema].fields[primaryKeys[0]]
    }
}