import {SchemaValueConverterProcessor} from "./interfaces";
import {FieldType} from "../../../settings/schema";

/**
 * Процессор конвертации значений типа Float!
 */
export class FloatNotNullValueProcessor implements SchemaValueConverterProcessor {
    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param value
     */
    convertValueFromGraphQL(value: any): any {
        switch (typeof value) {
            case "number":
                return value
            case "string":
                return parseFloat(value) || 0
            default:
                return 0
        }
    }

    /**
     * Конвертация системного значения в формат GraphQL
     * @param value
     */
    convertValueToGraphQL(value: any): string {
        if (!value && value !== 0) {
            return `0`
        }

        return `${value}`;
    }

    /**
     * Проверка доступности процессора
     * @param fieldType
     */
    isAvailable(fieldType: FieldType): boolean {
        return fieldType === "Float!";
    }
}