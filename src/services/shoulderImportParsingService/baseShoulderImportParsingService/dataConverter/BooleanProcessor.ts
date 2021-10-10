import {DataConverterProcessorInterface} from "./interfaces";
import {FieldConfiguration} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор логических значений
 */
export class BooleanProcessor<T, field extends keyof T> implements DataConverterProcessorInterface<T, field> {
    /**
     * Проверка доступности процессора
     * @param configuration
     */
    isAvailable(configuration: FieldConfiguration<T, field>): boolean {
        return configuration.fieldValueType === "boolean";
    }

    /**
     * Конвертация данных
     * @param _
     * @param data
     */
    async convertData(_: FieldConfiguration<T, field>, data: string): Promise<any> {
        return [
            "yes",
            "true",
            "да",
            "+",
            "1"
        ].indexOf(data.trim().toLowerCase()) !== -1;
    }
}