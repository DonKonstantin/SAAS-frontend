import {FieldSingleValueParserProcessorInterface} from "./interfaces";
import {
    FieldConfigurationCollection,
    FieldSettings,
    ImportProcessingConfigurationType
} from "../../../shoulderImportTaskService/baseTypes";
import {v4} from "uuid";

/**
 * Процессор парсинга значений типа UUID
 */
export class UuidProcessor implements FieldSingleValueParserProcessorInterface {
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
        return settings.type === "uuid"
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
        const val = v4();
        if (fieldConfiguration[settings.field].fieldIsArray) {
            return [val]
        }

        return val;
    }
}