import {RowDataGetterProcessorInterface} from "./interface";
import {
    ImportParsingConfigurationTypes,
    ImportParsingTypes,
    SheetConfig
} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор получения строк для обработки для конфигурации "Строки на листе"
 */
export class RowInSheetProcessor implements RowDataGetterProcessorInterface {
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
        return ["rowInSheet"].indexOf(parsingType) !== -1
    }

    /**
     * Получение строк для обработки данных по конфигурации парсинга
     *
     * @param data
     * @param _
     * @param __
     * @param parsingConfig
     * @param ____
     */
    getRows<ParsingType extends ImportParsingTypes>(
        data: { [K in string]: string[][] },
        _: string[],
        __: ParsingType,
        parsingConfig: ImportParsingConfigurationTypes[ParsingType],
        ____: object,
    ): string[][] {
        const {sheetIndex, startRow, endRow} = parsingConfig as SheetConfig;
        const sheet = data[Object.keys(data)[sheetIndex]];

        return sheet.slice(startRow, endRow + 1)
    }
}