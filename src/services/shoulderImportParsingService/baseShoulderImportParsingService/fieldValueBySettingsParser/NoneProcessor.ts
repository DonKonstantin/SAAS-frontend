import {FieldSingleValueParserProcessorInterface} from "./interfaces";
import {
    FieldConfigurationCollection,
    FieldSettings,
    ImportProcessingConfigurationType
} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор парсинга отсутствующих значений
 */
export class NoneProcessor implements FieldSingleValueParserProcessorInterface {
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
        return settings.type === "none"
    }

    /**
     * Парсинг переданных данных по конфигурации полей
     * @param _
     * @param __
     * @param settings
     * @param fieldConfiguration
     */
    async parse<Entity extends object, field extends keyof Entity>(
        _: { [p: string]: string[][] },
        __: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        fieldConfiguration: FieldConfigurationCollection<Entity>
    ): Promise<any> {
        const {field} = settings;
        const {fieldIsNullable = false, fieldIsArray = false} = fieldConfiguration[field];

        if (fieldIsNullable) {
            if (fieldIsArray) {
                return []
            }

            return null;
        }

        throw new Error(`Не задано значение для обязательного поля`)
    }
}