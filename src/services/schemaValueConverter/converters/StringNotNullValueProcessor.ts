import {SchemaValueConverterProcessor} from "./interfaces";
import {FieldType} from "../../../settings/schema";

/**
 * Процессор конвертации значений типа String!
 */
export class StringNotNullValueProcessor implements SchemaValueConverterProcessor {
    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param value
     */
    convertValueFromGraphQL(value: any): any {
        if (Array.isArray(value)) {
            return value.map(v => this.convertValueFromGraphQL(v)).join(", ")
        }

        switch (typeof value) {
            case "number":
                return `${value}`;
            case "string":
                return value;
            case "boolean":
                return value ? `true` : `false`;
            default:
                if (value) {
                    return `${value}`
                }

                return ``
        }
    }

    /**
     * Конвертация системного значения в формат GraphQL
     * @param value
     */
    convertValueToGraphQL(value: any): string {
        if (!value) {
            return ``
        }

        return `"${`${value}`.replace(`"`, `\\"`)}"`;
    }

    /**
     * Проверка доступности процессора
     * @param fieldType
     */
    isAvailable(fieldType: FieldType): boolean {
        return fieldType === "String!" || fieldType === "ID!";
    }
}