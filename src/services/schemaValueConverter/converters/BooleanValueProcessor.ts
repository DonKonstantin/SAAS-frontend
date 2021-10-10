import {SchemaValueConverterProcessor} from "./interfaces";
import {FieldType} from "../../../settings/schema";

/**
 * Процессор конвертации значений типа Boolean
 */
export class BooleanValueProcessor implements SchemaValueConverterProcessor {
    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param value
     */
    convertValueFromGraphQL(value: any): any {
        switch (typeof value) {
            case "number":
                return value === 1
            case "string":
                return value.toLocaleLowerCase() === "true"
            case "boolean":
                return value
            default:
                return null
        }
    }

    /**
     * Конвертация системного значения в формат GraphQL
     * @param value
     */
    convertValueToGraphQL(value: any): string {
        if (!value && value !== false) {
            return `"null"`
        }

        return value ? `true` : `false`;
    }

    /**
     * Проверка доступности процессора
     * @param fieldType
     */
    isAvailable(fieldType: FieldType): boolean {
        return fieldType === "Boolean";
    }
}