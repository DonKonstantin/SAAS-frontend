import {SchemaValueConverterProcessor} from "./interfaces";
import {FieldType} from "../../../settings/schema";

/**
 * Процессор конвертации значений типа DateTime
 */
export class DateTimeValueProcessor implements SchemaValueConverterProcessor {
    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param value
     */
    convertValueFromGraphQL(value: any): any {
        switch (typeof value) {
            case "string":
                return new Date(value) || new Date(Date.now());
            default:
                return null
        }
    }

    /**
     * Конвертация системного значения в формат GraphQL
     * @param value
     */
    convertValueToGraphQL(value: any): string {
        if (!value) {
            return `"null"`
        }

        switch (typeof value) {
            case "string":
                return `"${value}"`;
            default:
                return `"${value.toISOString()}"`
        }
    }

    /**
     * Проверка доступности процессора
     * @param fieldType
     */
    isAvailable(fieldType: FieldType): boolean {
        return fieldType === "DateTime";
    }
}