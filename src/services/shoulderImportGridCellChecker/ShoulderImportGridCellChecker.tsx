import {ShoulderImportGridCellCheckerInterface, ShoulderImportGridCellCheckerProcessorInterface} from "./interfaces";
import {Column} from "../excelGridColumnsGenerator/interface";
import {TableCellUsageInfo} from "../../custom/components/ImportDataGrid/ImportDataGridCell";
import {ImportParsingConfigurationTypes} from "../shoulderImportTaskService/baseTypes";

/**
 * Сервис проверки наличия ячейки в конфигурации плеч
 */
export class ShoulderImportGridCellChecker<T> implements ShoulderImportGridCellCheckerInterface<T> {
    private readonly processors: ShoulderImportGridCellCheckerProcessorInterface<T>[];

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(...processors: ShoulderImportGridCellCheckerProcessorInterface<T>[]) {
        this.processors = processors;
    }

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
    ): TableCellUsageInfo {
        let fields: string[] = [];
        let primaryColor: string | undefined = undefined;
        let secondaryColor: string | undefined = undefined;

        for (let processor of this.processors) {
            const processorResult = processor.checkCell(sheet, rowNumber, column, parsingConfiguration, parentParsingConfig);
            if (!processorResult) {
                continue
            }

            const {fields: processedFields, cellColor, secondCellColor} = processorResult;
            if (0 !== processedFields.length) {
                fields.push(...processedFields)
            }

            if (cellColor) {
                primaryColor = cellColor;
            }

            if (secondCellColor) {
                secondaryColor = secondCellColor;
            }
        }

        return {
            fields: fields,
            cellColor: primaryColor,
            secondCellColor: secondaryColor,
        };
    }
}