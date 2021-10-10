import {FilterLoaderInterface, LoadedFiltersData} from "./interfaces";
import {SchemaField, Schemas} from "../../../settings/schema";
import {
    AvailableFilterField,
    AvailableFilterFieldFieldTypes,
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration,
} from "./types";
import {FilterBaseValuesLoaderInterface} from "./filterBaseValuesLoader/interfaces";
import {FilterValueLoaderInterface} from "./filterValueLoader/interfaces";
import {FilterPreloaderInterface} from "./filterPreloader/interfaces";
import {Logger, LoggerFactory} from "../../logger/Logger";

/**
 * Загрузчик данных фильтра
 */
export class FilterLoader implements FilterLoaderInterface {
    private readonly baseValuesLoader: FilterBaseValuesLoaderInterface;
    private readonly valuesLoader: FilterValueLoaderInterface;
    private readonly preloadLoader: FilterPreloaderInterface;
    private readonly schemas: Schemas;
    private readonly availableFieldTypes: AvailableFilterFieldFieldTypes;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param baseValuesLoader
     * @param valuesLoader
     * @param preloadLoader
     * @param logger
     */
    constructor(
        baseValuesLoader: FilterBaseValuesLoaderInterface,
        valuesLoader: FilterValueLoaderInterface,
        preloadLoader: FilterPreloaderInterface,
        logger: LoggerFactory,
    ) {
        this.baseValuesLoader = baseValuesLoader;
        this.valuesLoader = valuesLoader;
        this.preloadLoader = preloadLoader;
        this.schemas = new Schemas();
        this.availableFieldTypes = new AvailableFilterFieldFieldTypes();
        this.logger = logger.make(`FilterLoader`)
    }

    /**
     * Загрузка данных фильтра
     * @param configuration
     * @param additionFilter
     */
    async Load<T extends keyof Schemas>(
        configuration: FilterFieldsConfiguration<T>,
        additionFilter: {[T: string]: string},
    ): Promise<LoadedFiltersData<T>> {
        const invalidFields = Object.values(configuration).filter((config: BaseFilterFieldConfiguration<T, keyof Schemas[T]['fields'], AvailableFilterField>): boolean => {
            // @ts-ignore
            const fieldConfig: SchemaField = this.schemas[config.schema].fields[config.field];
            const availableTypes: AvailableFilterField[] = this.availableFieldTypes[fieldConfig.type];

            return availableTypes.indexOf(config.filterType) === -1
        });

        if (0 !== invalidFields.length) {
            this.logger.Error(
                `Some fields has invalid types`,
                ...invalidFields
            );

            return {}
        }

        const baseValues = await this.baseValuesLoader.Load<T>(configuration, additionFilter);
        if (0 === Object.values(baseValues).length) return {};

        const values = this.valuesLoader.Load<T>({baseData: baseValues, configuration: configuration});
        const preloaded = await this.preloadLoader.Load<T>({baseData: baseValues, configuration: configuration});

        return Object.values(configuration).reduce(
            (
                result: LoadedFiltersData<T>,
                config: BaseFilterFieldConfiguration<T, keyof Schemas[T]['fields'], AvailableFilterField>
            ): LoadedFiltersData<T> => {
                const value = values[config.field];
                const preload = preloaded[config.field];

                return {
                    ...result,
                    [config.field]: {
                        value: value,
                        configuration: config,
                        preloaded: preload,
                    },
                }
            },
            {}
        )
    }
}