import {Collection} from "../types";

/**
 * Базовый генератор строки Where для переданных параметров
 */
export class ListWhereParameterGenerator {
    /**
     * Генерирует строку фильтрации для вставки в GraphQL запрос по переданным параметрам
     *
     * @param parameters
     */
    build(parameters: Collection<any>): string {
        if (Object.keys(parameters).length === 0) {
            return ``
        }

        return Object.keys(parameters)
            .map<string>((key: keyof Collection<any>): string => {
                let value = `${parameters[key]}`;
                if (typeof parameters[key] === "string") {
                    value = `"${value}"`
                }

                return `${key}: {_eq: ${value}}`
            })
            .join(',')
            ;
    }
}
