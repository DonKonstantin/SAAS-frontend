import {RowDataGetterInterface, RowDataGetterProcessorInterface} from "./interface";
import {ImportParsingConfigurationTypes, ImportParsingTypes} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Сервис получения строк для парсинга значений
 */
export class RowDataGetter implements RowDataGetterInterface {
    private readonly processors: RowDataGetterProcessorInterface[];

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(...processors: RowDataGetterProcessorInterface[]) {
        this.processors = processors
    }

    /**
     * Получение строк для обработки данных по конфигурации парсинга
     *
     * @param data
     * @param parentRow
     * @param parsingType
     * @param parsingConfig
     * @param parentValues
     */
    getRows<ParsingType extends ImportParsingTypes>(
        data: { [K in string]: string[][] },
        parentRow: string[],
        parsingType: ParsingType,
        parsingConfig: ImportParsingConfigurationTypes[ParsingType],
        parentValues: object,
    ): string[][] {
        for (let processor of this.processors) {
            if (processor.isAvailable(data, parentRow, parsingType, parsingConfig, parentValues)) {
                return processor.getRows(data, parentRow, parsingType, parsingConfig, parentValues)
            }
        }

        return []
    }
}