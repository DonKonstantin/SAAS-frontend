import {ShoulderImportGridCellCheckerProcessorInterface} from "./interfaces";
import {Column} from "../excelGridColumnsGenerator/interface";
import {TableCellUsageInfo} from "../../custom/components/ImportDataGrid/ImportDataGridCell";
import {
    CellConfiguration,
    Configurations, FieldSettings,
    ImportParsingConfigurationTypes
} from "../shoulderImportTaskService/baseTypes";
import {getSheetIndex} from "../../custom/hoc/ShouldersImportCreatePage/DataPreparingHoc";
import {Colors} from "./colors";

/**
 * Процессор поиска ячейки в конфигурации для ячейки какого либо поля
 */
export class CellOfConfigProcessor<M extends object,
    T extends Configurations<any, any, M, any, any>> implements ShoulderImportGridCellCheckerProcessorInterface<T> {

    private readonly colors: Colors<M>;

    /**
     * Конструктор сервиса
     * @param colors
     */
    constructor(colors: Colors<M>) {
        this.colors = colors;
    }

    /**
     * Получение данных об использовании ячейки в конфигурации плеч
     * @param sheet
     * @param rowNumber
     * @param column
     * @param parsingConfiguration
     * @param _
     */
    checkCell(
        sheet: string,
        rowNumber: number,
        column: Column,
        parsingConfiguration: T,
        _?: ImportParsingConfigurationTypes[keyof ImportParsingConfigurationTypes],
    ): TableCellUsageInfo | undefined {
        let fields: string[] = [];
        let primaryColor: string | undefined = undefined;
        let secondaryColor: string | undefined = undefined;

        for (let config of parsingConfiguration.configuration) {
            const {fieldsConfiguration, settings: fieldsSettings} = config;

            for (let settings of Object.values(fieldsSettings)) {
                const {type, configuration, field} = settings as FieldSettings<M, keyof M, any>;
                if (type !== "cell") {
                    continue
                }

                const typedConfig = configuration as CellConfiguration;
                if (getSheetIndex(sheet) !== typedConfig.sheetIndex
                    || typedConfig.rowIndex !== rowNumber
                    || typedConfig.columnIndex !== column.index
                ) {
                    continue
                }

                fields.push(`${fieldsConfiguration[field].fieldTitle} (${parsingConfiguration.title})`);
                const colors = this.colors[field];

                primaryColor = colors.primaryColor;
                secondaryColor = colors.secondaryColor;
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