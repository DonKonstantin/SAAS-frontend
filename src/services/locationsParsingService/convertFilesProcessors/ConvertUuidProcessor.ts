import {Config, ConvertFilesToBaseLocationToImportProcessorInterface} from "../interface";
import {ConfigurationParsingMethod} from "../types";
import {v4} from "uuid";

/**
 * Процессор конвертации значения для UUID
 */
export class ConvertUuidProcessor implements ConvertFilesToBaseLocationToImportProcessorInterface {
    /**
     * Конвертация значения из переданной строки по переданной конфигурации
     * @param _
     * @param __
     */
    convert(_: string[], __: Config<ConfigurationParsingMethod>): any {
        return v4();
    }

    /**
     * Проверка доступности процессора
     * @param config
     */
    isAvailable(config: Config<ConfigurationParsingMethod>): boolean {
        return config.type === "uuid";
    }
}