import {SchemaValueConverterProcessor} from "./interfaces";
import {FieldType} from "../../../settings/schema";

/**
 * Процессор конвертации значений типа NullableID
 */
export class NullableIDProcessor implements SchemaValueConverterProcessor {
    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param value
     */
    convertValueFromGraphQL(value: any): any {
        return value !== null ? value : ""
    }

    /**
     * Конвертация системного значения в формат GraphQL
     * @param value
     */
    convertValueToGraphQL(value: any): string {
        if (!value && value !== false) {
            return `"null"`
        }

        return value;
    }

    /**
     * Проверка доступности процессора
     * @param fieldType
     */
    isAvailable(fieldType: FieldType): boolean {
        return fieldType === "NullableID";
    }
}