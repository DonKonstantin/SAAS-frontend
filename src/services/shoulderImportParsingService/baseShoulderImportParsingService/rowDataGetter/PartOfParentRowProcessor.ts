import {RowDataGetterProcessorInterface} from "./interface";
import {
    ImportParsingConfigurationTypes,
    ImportParsingTypes,
} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор получения строк для обработки для конфигурации "Часть строки родителя"
 */
export class PartOfParentRowProcessor implements RowDataGetterProcessorInterface {
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
        return ["partOfParentRow"].indexOf(parsingType) !== -1
    }

    /**
     * Получение строк для обработки данных по конфигурации парсинга
     *
     * @param ___
     * @param parentRow
     * @param _
     * @param __
     * @param ____
     */
    getRows<ParsingType extends ImportParsingTypes>(
        ___: { [K in string]: string[][] },
        parentRow: string[],
        _: ParsingType,
        __: ImportParsingConfigurationTypes[ParsingType],
        ____: object,
    ): string[][] {
        return [parentRow]
    }
}