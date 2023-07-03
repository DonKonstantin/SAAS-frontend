import {SchemaValueConverterProcessor} from "./interfaces";
import {FieldType} from "../../../settings/schema";

/**
 * Процессор конвертации значений типа Boolean
 */
export class EnumValueProcessor implements SchemaValueConverterProcessor {
    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param value
     */
    convertValueFromGraphQL(value: any): any {
        if (!value) {
            return null
        }

        return `${value}`
    }

    /**
     * Конвертация системного значения в формат GraphQL
     * @param value
     */
    convertValueToGraphQL(value: any): string {
        if (!value) {
            return `"null"`
        }

        return value ? `${value}` : ``;
    }

    /**
     * Проверка доступности процессора
     * @param fieldType
     */
    isAvailable(fieldType: FieldType): boolean {
        return fieldType === "Enum";
    }
}