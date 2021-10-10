import {RowDataGetterProcessorInterface} from "./interface";
import {
    ImportParsingConfigurationTypes,
    ImportParsingTypes,
    SheetWithRelationConfig
} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор получения строк для обработки для конфигурации "Строки на листе с отношением"
 */
export class RowInSheetWithRelationProcessor implements RowDataGetterProcessorInterface {
    private readonly parentIdFieldKey: keyof object;

    /**
     * Конструктор процессора
     * @param parentIdFieldKey
     */
    constructor(parentIdFieldKey: string) {
        this.parentIdFieldKey = parentIdFieldKey as keyof object;
    }

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
        return ["rowInSheetWithRelation"].indexOf(parsingType) !== -1
    }

    /**
     * Получение строк для обработки данных по конфигурации парсинга
     *
     * @param data
     * @param _
     * @param __
     * @param parsingConfig
     * @param parentValues
     */
    getRows<ParsingType extends ImportParsingTypes>(
        data: { [K in string]: string[][] },
        _: string[],
        __: ParsingType,
        parsingConfig: ImportParsingConfigurationTypes[ParsingType],
        parentValues: object,
    ): string[][] {
        const {sheetIndex, startRow, endRow, parentIdColumn} = parsingConfig as SheetWithRelationConfig;
        const sheet = data[Object.keys(data)[sheetIndex]];
        const rows = sheet.slice(startRow, endRow + 1);

        const parentPrimaryKeyValue = parentValues[this.parentIdFieldKey];
        if (!parentPrimaryKeyValue) {
            return [];
        }

        return rows.filter(row => {
            return `${row[parentIdColumn]}` === `${parentPrimaryKeyValue}`
        }) || []
    }
}