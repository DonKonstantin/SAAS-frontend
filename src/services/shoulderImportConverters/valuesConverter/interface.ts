import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Конвертер временных значений в итоговые
 */
export interface ValuesConverterInterface {
    /**
     * Конвертация временных значений в итоговую сущность
     * @param values
     */
    convert<T>(values: Values<T>[]): T[]
}