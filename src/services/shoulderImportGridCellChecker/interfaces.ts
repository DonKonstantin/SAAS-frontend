import {Column} from "../excelGridColumnsGenerator/interface";
import {TableCellUsageInfo} from "../../custom/components/ImportDataGrid/ImportDataGridCell";
import {ImportParsingConfigurationTypes} from "../shoulderImportTaskService/baseTypes";

/**
 * Сервис проверки наличия ячейки в конфигурации плеч
 */
export interface ShoulderImportGridCellCheckerInterface<T> {
    /**
     * Получение данных об использовании ячейки в конфигурации плеч
     * @param sheet
     * @param rowNumber
     * @param column
     * @param parsingConfiguration
     * @param parentParsingConfig
     */
    checkCell(
        sheet: string,
        rowNumber: number,
        column: Column,
        parsingConfiguration: T,
        parentParsingConfig?: ImportParsingConfigurationTypes[keyof ImportParsingConfigurationTypes],
    ): TableCellUsageInfo
}

/**
 * Процессор для обработки проверки наличия ячейки в конфигурации
 */
export interface ShoulderImportGridCellCheckerProcessorInterface<T> {
    /**
     * Получение данных об использовании ячейки в конфигурации плеч
     * @param sheet
     * @param rowNumber
     * @param column
     * @param parsingConfiguration
     * @param parentParsingConfig
     */
    checkCell(
        sheet: string,
        rowNumber: number,
        column: Column,
        parsingConfiguration: T,
        parentParsingConfig?: ImportParsingConfigurationTypes[keyof ImportParsingConfigurationTypes],
    ): TableCellUsageInfo | undefined
}