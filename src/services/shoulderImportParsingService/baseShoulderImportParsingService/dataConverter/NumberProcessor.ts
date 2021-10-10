import {DataConverterProcessorInterface} from "./interfaces";
import {FieldConfiguration} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор числовых значений
 */
export class NumberProcessor<T, field extends keyof T> implements DataConverterProcessorInterface<T, field> {
    /**
     * Проверка доступности процессора
     * @param configuration
     */
    isAvailable(configuration: FieldConfiguration<T, field>): boolean {
        return configuration.fieldValueType === "number" && !configuration.relation;
    }

    /**
     * Конвертация данных
     * @param _
     * @param data
     */
    async convertData(_: FieldConfiguration<T, field>, data: string): Promise<any> {
        return Number(data);
    }
}