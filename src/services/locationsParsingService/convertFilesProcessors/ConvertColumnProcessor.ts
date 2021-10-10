import {
    ColumnConfiguration,
    Config,
    ConvertFilesToBaseLocationToImportProcessorInterface,
} from "../interface";
import {ConfigurationParsingMethod} from "../types";

/**
 * Процессор конвертации значения для колонки
 */
export class ConvertColumnProcessor implements ConvertFilesToBaseLocationToImportProcessorInterface {
    /**
     * Конвертация значения из переданной строки по переданной конфигурации
     * @param row
     * @param config
     */
    convert(row: string[], config: Config<ConfigurationParsingMethod>): any {
        return row[(config.configuration as ColumnConfiguration).column.index];
    }

    /**
     * Проверка доступности процессора
     * @param config
     */
    isAvailable(config: Config<ConfigurationParsingMethod>): boolean {
        return config.type === "column";
    }
}