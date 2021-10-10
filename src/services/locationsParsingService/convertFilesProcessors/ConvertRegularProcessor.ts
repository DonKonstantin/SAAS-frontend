import {Config, ConvertFilesToBaseLocationToImportProcessorInterface, RegularValueConfiguration} from "../interface";
import {ConfigurationParsingMethod} from "../types";

/**
 * Процессор конвертации значения для статичного значения
 */
export class ConvertRegularProcessor implements ConvertFilesToBaseLocationToImportProcessorInterface {
    /**
     * Конвертация значения из переданной строки по переданной конфигурации
     * @param _
     * @param config
     */
    convert(_: string[], config: Config<ConfigurationParsingMethod>): any {
        return (config.configuration as RegularValueConfiguration).value;
    }

    /**
     * Проверка доступности процессора
     * @param config
     */
    isAvailable(config: Config<ConfigurationParsingMethod>): boolean {
        return config.type === "regular";
    }
}