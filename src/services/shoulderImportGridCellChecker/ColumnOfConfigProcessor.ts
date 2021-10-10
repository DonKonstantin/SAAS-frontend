import {ShoulderImportGridCellCheckerProcessorInterface} from "./interfaces";
import {Colors} from "./colors";
import {Column} from "../excelGridColumnsGenerator/interface";
import {TableCellUsageInfo} from "../../custom/components/ImportDataGrid/ImportDataGridCell";
import {
    ColumnConfiguration,
    Configurations, FieldSettings,
    ImportParsingConfigurationTypes,
    SheetConfig, SheetWithRelationConfig
} from "../shoulderImportTaskService/baseTypes";
import {getSheetIndex} from "../../custom/hoc/ShouldersImportCreatePage/DataPreparingHoc";
import red from "@material-ui/core/colors/red";
import {orange} from "@material-ui/core/colors";

/**
 * Процессор поиска колонки в конфигурации для ячейки какого либо поля
 */
export class ColumnOfConfigProcessor<M extends object,
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
            const {fieldsConfiguration, settings: fieldsSettings, parsingType, parsingConfig} = config;

            if (["rowInSheet", "rowInSheetWithRelation", "partOfParentRow"].indexOf(parsingType) === -1) {
                continue
            }

            switch (parsingType) {
                case "partOfParentRow":
                    if (!parentParsingConfig) {
                        continue
                    }

                    const conf = parentParsingConfig as SheetConfig;
                    if (getSheetIndex(sheet) !== conf.sheetIndex
                        || conf.startRow > rowNumber
                        || conf.endRow < rowNumber
                    ) {
                        continue
                    }

                    break;
                case "rowInSheetWithRelation":
                    const relConfig = parsingConfig as SheetWithRelationConfig;
                    if (getSheetIndex(sheet) !== relConfig.sheetIndex
                        || relConfig.startRow > rowNumber
                        || relConfig.endRow < rowNumber
                    ) {
                        continue
                    }

                    if (relConfig.parentIdColumn === column.index) {
                        fields.push(`ID родителя (${parsingConfiguration.title})`);
                        primaryColor = red[500];
                        secondaryColor = orange[500];
                    }

                    break;
                case "rowInSheet":
                    const typedConfig = parsingConfig as SheetConfig;
                    if (getSheetIndex(sheet) !== typedConfig.sheetIndex
                        || typedConfig.startRow > rowNumber
                        || typedConfig.endRow < rowNumber
                    ) {
                        continue
                    }
            }

            for (let settings of Object.values(fieldsSettings)) {
                const {type, configuration, field} = settings as FieldSettings<M, keyof M, any>;
                if (type !== "column") {
                    continue
                }

                const typedConfig = configuration as ColumnConfiguration;
                if (typedConfig.columnIndex !== column.index) {
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