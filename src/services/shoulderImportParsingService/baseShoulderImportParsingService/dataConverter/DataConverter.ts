import {DataConverterInterface, DataConverterProcessorInterface} from "./interfaces";
import {FieldConfiguration} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Сервис преобразования переданных данных в тип, установленный в конфигурации
 */
export class DataConverter<T, field extends keyof T> implements DataConverterInterface<T, field> {
    private readonly processors: DataConverterProcessorInterface<T, field>[];

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(...processors: DataConverterProcessorInterface<T, field>[]) {
        this.processors = processors;
    }

    /**
     * Конвертация данных
     * @param configuration
     * @param data
     */
    async convertData(configuration: FieldConfiguration<T, field>, data: string): Promise<any> {
        for (let processor of this.processors) {
            if (processor.isAvailable(configuration)) {
                return await processor.convertData(configuration, data)
            }
        }

        throw new Error(`Нет необходимого процессора для обработки значения`)
    }
}