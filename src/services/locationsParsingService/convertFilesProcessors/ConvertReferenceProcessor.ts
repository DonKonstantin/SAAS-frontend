import {
    Config,
    ConvertFilesToBaseLocationToImportProcessorInterface,
    ReferenceConfiguration,
} from "../interface";
import {ConfigurationParsingMethod} from "../types";

/**
 * Процессор конвертации значения для ссылки.
 * По сути для начала просто выставляет значение по колонке.
 */
export class ConvertReferenceProcessor implements ConvertFilesToBaseLocationToImportProcessorInterface {
    /**
     * Конвертация значения из переданной строки по переданной конфигурации
     * @param row
     * @param config
     */
    convert(row: string[], config: Config<ConfigurationParsingMethod>): any {
        return row[(config.configuration as ReferenceConfiguration).column.index];
    }

    /**
     * Проверка доступности процессора
     * @param config
     */
    isAvailable(config: Config<ConfigurationParsingMethod>): boolean {
        return config.type === "reference";
    }
}