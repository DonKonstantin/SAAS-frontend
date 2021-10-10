import {ValuesConverterInterface} from "./interface";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Конвертер временных значений в итоговые
 */
export class ValuesConverter implements ValuesConverterInterface {
    /**
     * Конвертация временных значений в итоговую сущность
     * @param values
     */
    convert<T>(values: Values<T>[]): T[] {
        return values.map(value => {
            // @ts-ignore
            const result: T = {};
            (Object.keys(value) as (keyof T)[]).map(key => {
                result[key] = Array.isArray(value[key].value)
                    ? (
                        typeof value[key].value[0] === "object"
                            ? this.convert(value[key].value)
                            : value[key].value
                    )
                    : value[key].value
            });

            return result;
        });
    }
}