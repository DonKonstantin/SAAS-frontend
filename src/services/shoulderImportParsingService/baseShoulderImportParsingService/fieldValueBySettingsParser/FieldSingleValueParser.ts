import {FieldSingleValueParserInterface, FieldSingleValueParserProcessorInterface} from "./interfaces";
import {
    FieldConfigurationCollection, FieldSettings,
    ImportProcessingConfigurationType
} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Парсинг одиночного поля по переданной конфигурации
 */
export class FieldSingleValueParser implements FieldSingleValueParserInterface {
    private readonly processors: FieldSingleValueParserProcessorInterface[];

    /**
     * Конструктор процессора
     * @param processors
     */
    constructor(...processors: FieldSingleValueParserProcessorInterface[]) {
        this.processors = processors
    }

    /**
     * Парсинг переданных данных по конфигурации полей
     * @param data
     * @param rowData
     * @param settings
     * @param fieldsConfiguration
     */
    async parse<Entity extends object, field extends keyof Entity>(
        data: { [K in string]: string[][] },
        rowData: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        fieldsConfiguration: FieldConfigurationCollection<Entity>
    ): Promise<any> {
        for (let processor of this.processors) {
            if (processor.isAvailable(data, rowData, settings, fieldsConfiguration)) {
                return await processor.parse(data, rowData, settings, fieldsConfiguration)
            }
        }

        throw new Error(`Не найден процессор для парсинга значения поля`)
    }
}