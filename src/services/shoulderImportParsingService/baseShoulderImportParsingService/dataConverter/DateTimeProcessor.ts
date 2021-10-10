import {DataConverterProcessorInterface} from "./interfaces";
import {FieldConfiguration} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор значений даты
 */
export class DateTimeProcessor<T, field extends keyof T> implements DataConverterProcessorInterface<T, field> {
    /**
     * Проверка доступности процессора
     * @param configuration
     */
    isAvailable(configuration: FieldConfiguration<T, field>): boolean {
        return configuration.fieldValueType === "dateTime";
    }

    /**
     * Конвертация данных
     * @param configuration
     * @param data
     */
    async convertData(configuration: FieldConfiguration<T, field>, data: string): Promise<any> {
        const timestamp = Date.parse(data);
        if (isNaN(timestamp)) {
            throw new Error(`Не удалось преобразовать значение в дату: ${data}`)
        }

        const {dateNormalization = date => date} = configuration;
        return dateNormalization(new Date(timestamp));
    }
}