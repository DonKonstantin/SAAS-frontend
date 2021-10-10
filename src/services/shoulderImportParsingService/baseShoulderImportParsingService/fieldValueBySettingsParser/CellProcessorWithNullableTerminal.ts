import {FieldSingleValueParserProcessorInterface} from "./interfaces";
import {
    CellConfiguration,
    FieldConfigurationCollection,
    FieldSettings,
    ImportProcessingConfigurationType
} from "../../../shoulderImportTaskService/baseTypes";
import {DataConverterInterface} from "../dataConverter/interfaces";
import {dataConverter} from "../dataConverter";
import {ShoulderConfiguration} from "../../../shoulderImportTaskService/shoulderTypes";
import {NullableTerminalLoaderInterface} from "../nullableTerminalLoader/interface";
import {nullableTerminalLoader} from "../nullableTerminalLoader";

/**
 * Процессор парсинга ячейки со значением
 */
export class CellProcessorWithNullableTerminal implements FieldSingleValueParserProcessorInterface {
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
        return settings.type === "cell"
            && (settings.configuration as CellConfiguration).isNeedSearchNullableTerminal
    }

    /**
     * Парсинг переданных данных по конфигурации полей
     * @param data
     * @param _
     * @param settings
     * @param fieldConfiguration
     */
    async parse<Entity extends object, field extends keyof Entity>(
        data: { [K in string]: string[][] },
        _: string[],
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
            sheetIndex,
            columnIndex,
            rowIndex,
            delimiter
        } = configuration as CellConfiguration;

        const cellValue = data[Object.keys(data)[sheetIndex]][rowIndex][columnIndex];
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