import {FieldConfiguration} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Сервис преобразования переданных данных в тип, установленный в конфигурации
 */
export interface DataConverterInterface<T, field extends keyof T> {
    /**
     * Конвертация данных
     * @param configuration
     * @param data
     */
    convertData(
        configuration: FieldConfiguration<T, field>,
        data: string,
    ): Promise<any>
}

/**
 * Процессор для преобразования значения
 */
export interface DataConverterProcessorInterface<T, field extends keyof T> {
    /**
     * Проверка доступности процессора
     * @param configuration
     */
    isAvailable(configuration: FieldConfiguration<T, field>): boolean

    /**
     * Конвертация данных
     * @param configuration
     * @param data
     */
    convertData(
        configuration: FieldConfiguration<T, field>,
        data: string,
    ): Promise<any>
}