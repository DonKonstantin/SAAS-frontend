import {FieldSingleValueParserProcessorInterface} from "./interfaces";
import {
    ColumnConfiguration, FieldConfigurationCollection,
    FieldSettings,
    ImportProcessingConfigurationType
} from "../../../shoulderImportTaskService/baseTypes";
import {DataConverterInterface} from "../dataConverter/interfaces";
import {dataConverter} from "../dataConverter";
import {ShoulderConfiguration} from "../../../shoulderImportTaskService/shoulderTypes";
import {NullableTerminalLoaderInterface} from "../nullableTerminalLoader/interface";
import {nullableTerminalLoader} from "../nullableTerminalLoader";

/**
 * Процессор парсинга колонки со значением, когда выбран парсинг нулевого терминала
 */
export class ColumnProcessorWithNullableTerminal implements FieldSingleValueParserProcessorInterface {
    private readonly dataConverter: DataConverterInterface<any, any>;
    private readonly nullableTerminalLoader: NullableTerminalLoaderInterface;

    /**
     * Конструктор процессора
     */
    constructor() {
        this.dataConverter = dataConverter();
        this.nullableTerminalLoader = nullableTerminalLoader();
    }

    /**
     * Проверка доступности процессора
     * @param _
     * @param __
     * @param settings
     * @param ____
     */
    isAvailable<Entity extends object, field extends keyof Entity>(
        _: { [p: string]: string[][] },
        __: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        ____: FieldConfigurationCollection<Entity>
    ): boolean {
        return settings.type === "column"
            && (settings.configuration as ColumnConfiguration).isNeedSearchNullableTerminal
    }

    /**
     * Парсинг переданных данных по конфигурации полей
     * @param _
     * @param row
     * @param settings
     * @param fieldConfiguration
     */
    async parse<Entity extends object, field extends keyof Entity>(
        _: { [K in string]: string[][] },
        row: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        fieldConfiguration: FieldConfigurationCollection<Entity>
    ): Promise<any> {
        const {configuration, field} = settings;
        if (!configuration) {
            throw new Error(`Не удалось получить конфигурацию для поля`)
        }

        const fieldConfig = fieldConfiguration[field];
        const {fieldIsArray = false} = fieldConfig;
        const {
            columnIndex,
            delimiter
        } = configuration as ColumnConfiguration;

        const cellValue = row[columnIndex];
        const valuesToProcess = fieldIsArray ? `${cellValue}`.split(delimiter).map(val => val.trim()) : [`${cellValue}`];

        // Для поиска нулевых терминалов через локации необходимо для начала отыскать локации,
        // которые передал пользователь для обработки
        const shoulderConfig = new ShoulderConfiguration;
        const locationFieldConfig = {...shoulderConfig.from_location_ids};

        const values = await Promise.all(
            valuesToProcess.map(value => this.dataConverter.convertData(
                locationFieldConfig,
                value,
            ))
        );

        // Теперь необходимо отыскать сам нулевой терминал в переданном списке локаций
        const loadedValues = await this.nullableTerminalLoader.LoadTerminalIds(values);

        if (!fieldIsArray) {
            const [value] = loadedValues;

            return value
        }

        return loadedValues;
    }
}