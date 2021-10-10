import {FieldSingleValueParserProcessorInterface} from "./interfaces";
import {
    FieldConfigurationCollection,
    FieldSettings, FixedValueConfiguration,
    ImportProcessingConfigurationType
} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор парсинга фиксированных значений
 */
export class FixedValueProcessor implements FieldSingleValueParserProcessorInterface {
    /**
     * Проверка доступности процессора
     * @param _
     * @param __
     * @param settings
     * @param ___
     */
    isAvailable<Entity extends object, field extends keyof Entity>(
        _: { [p: string]: string[][] },
        __: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        ___: FieldConfigurationCollection<Entity>
    ): boolean {
        return settings.type === "fixedValue"
    }

    /**
     * Парсинг переданных данных по конфигурации полей
     * @param _
     * @param __
     * @param settings
     * @param ___
     */
    async parse<Entity extends object, field extends keyof Entity>(
        _: { [p: string]: string[][] },
        __: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        ___: FieldConfigurationCollection<Entity>
    ): Promise<any> {
        const {configuration} = settings;
        if (!configuration) {
            throw new Error(`Не удалось получить конфигурацию для поля`)
        }

        return (configuration as FixedValueConfiguration).value
    }
}