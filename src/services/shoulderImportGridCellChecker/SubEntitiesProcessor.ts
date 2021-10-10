import {ShoulderImportGridCellCheckerInterface, ShoulderImportGridCellCheckerProcessorInterface} from "./interfaces";
import {Column} from "../excelGridColumnsGenerator/interface";
import {TableCellUsageInfo} from "../../custom/components/ImportDataGrid/ImportDataGridCell";
import {Configurations, ImportParsingConfigurationTypes} from "../shoulderImportTaskService/baseTypes";

/**
 * Процессор для поиска ячейки в конфигурации шагов плеча
 */
export class SubEntitiesProcessor<K extends string,
    Conf extends Configurations<any, any, any, any, any>,
    T extends Configurations<any, any, any, any, {[D in K]: Conf}>> implements ShoulderImportGridCellCheckerProcessorInterface<T> {

    private readonly checker: ShoulderImportGridCellCheckerInterface<Conf>;
    private readonly subEntityKey: K;

    /**
     * Конструктор процессора
     * @param subEntityKey
     * @param shoulderStepChecker
     */
    constructor(subEntityKey: K, shoulderStepChecker: ShoulderImportGridCellCheckerInterface<Conf>) {
        this.subEntityKey = subEntityKey;
        this.checker = shoulderStepChecker;
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
    ): TableCellUsageInfo | undefined {
        let fields: string[] = [];
        let primaryColor: string | undefined = undefined;
        let secondaryColor: string | undefined = undefined;

        for (let config of parsingConfiguration.configuration) {
            const {parsingType, parsingConfig} = config;

            if (parsingType !== "partOfParentRow") {
                parentParsingConfig = parsingConfig;
            }

            const {fields: fieldsInResult, cellColor, secondCellColor} = this.checker.checkCell(
                sheet,
                rowNumber,
                column,
                config.subConfiguration[this.subEntityKey],
                parentParsingConfig,
            );

            if (0 === fieldsInResult.length) {
                continue;
            }

            fields.push(...fieldsInResult);
            if (!!cellColor) {
                primaryColor = cellColor;
            }

            if (!!secondCellColor) {
                secondaryColor = secondCellColor;
            }
        }

        if (fields.length === 0) {
            return undefined;
        }

        return {
            fields: fields,
            cellColor: primaryColor,
            secondCellColor: secondaryColor,
        };
    }
}