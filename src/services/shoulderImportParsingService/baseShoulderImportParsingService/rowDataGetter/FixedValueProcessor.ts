import {RowDataGetterProcessorInterface} from "./interface";
import {
    ImportParsingConfigurationTypes,
    ImportParsingTypes,
} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор получения строк для обработки для конфигурации "Фиксированное значение"
 */
export class FixedValueProcessor implements RowDataGetterProcessorInterface {
    /**
     * Проверка доступности процессора
     *
     * @param _
     * @param __
     * @param parsingType
     * @param ___
     * @param ____
     */
    isAvailable<ParsingType extends ImportParsingTypes>(
        _: { [K in string]: string[][] },
        __: string[],
        parsingType: ParsingType,
        ___: ImportParsingConfigurationTypes[ParsingType],
        ____: object,
    ): boolean {
        return ["fixedValue"].indexOf(parsingType) !== -1
    }

    /**
     * Получение строк для обработки данных по конфигурации парсинга
     *
     * @param ___
     * @param ____
     * @param _
     * @param __
     * @param _____
     */
    getRows<ParsingType extends ImportParsingTypes>(
        ___: { [K in string]: string[][] },
        ____: string[],
        _: ParsingType,
        __: ImportParsingConfigurationTypes[ParsingType],
        _____: object,
    ): string[][] {
        return [[]]
    }
}