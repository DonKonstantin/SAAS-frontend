import {DataConverterProcessorInterface} from "./interfaces";
import {FieldConfiguration} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор строковых значений
 */
export class StringProcessor<T, field extends keyof T> implements DataConverterProcessorInterface<T, field> {
    /**
     * Проверка доступности процессора
     * @param configuration
     */
    isAvailable(configuration: FieldConfiguration<T, field>): boolean {
        return configuration.fieldValueType === "string" && !configuration.relation;
    }

    /**
     * Конвертация данных
     * @param _
     * @param data
     */
    async convertData(_: FieldConfiguration<T, field>, data: string): Promise<any> {
        return data;
    }
}