import {ColumnsConfiguration, Config, ConvertFilesToBaseLocationToImportProcessorInterface} from "../interface";
import {ConfigurationParsingMethod} from "../types";

/**
 * Процессор для обработки объединения колонок с отношением
 */
export class ConvertRelationWithCompareProcessor implements ConvertFilesToBaseLocationToImportProcessorInterface {
    /**
     * Конвертация значения из переданной строки по переданной конфигурации
     * @param row
     * @param config
     */
    convert(row: string[], config: Config<ConfigurationParsingMethod>): any {
        const configuration = config.configuration as ColumnsConfiguration;
        return `${row[configuration.columnFirst.index]}${row[configuration.columnSecond.index]}`;
    }

    /**
     * Проверка доступности процессора
     * @param config
     */
    isAvailable(config: Config<ConfigurationParsingMethod>): boolean {
        return config.type === "compare-with-relation";
    }
}