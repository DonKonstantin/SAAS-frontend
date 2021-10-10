import {FilterPreloaderInterface, FilterPreloaderParameters, LoadedAdditionData} from "./interfaces";
import {Schemas} from "../../../../settings/schema";
import {AvailableFilterField, BaseFilterFieldConfiguration, DeclaredFilterFieldPreloadedData} from "../types";
import {FilterPreloaderProcessors} from "./processors/interfaces";
import {Logger, LoggerFactory} from "../../../logger/Logger";

interface AdditionDataResponse<T extends keyof Schemas> {
    field: keyof Schemas[T]['fields']
    preloaded: DeclaredFilterFieldPreloadedData[AvailableFilterField]
}

/**
 * Загрузчик дополнительных данных для фильтра
 */
export class FilterPreloader implements FilterPreloaderInterface {
    private readonly processors: FilterPreloaderProcessors;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param processors
     * @param logger
     */
    constructor(processors: FilterPreloaderProcessors, logger: LoggerFactory) {
        this.processors = processors;
        this.logger = logger.make(`FilterPreloader`);
    }

    /**
     * Загрузка базовых данных
     * @param params
     */
    async Load<T extends keyof Schemas>(params: FilterPreloaderParameters<T>): Promise<LoadedAdditionData<T>> {
        const promises = Object.values(params.configuration).map(
            async (
                config: BaseFilterFieldConfiguration<T, keyof Schemas[T]['fields'], AvailableFilterField>
            ): Promise<AdditionDataResponse<T>> => {
                try {
                    const data = params.baseData[config.field];
                    const processor = this.processors[config.filterType];

                    return {
                        field: config.field,
                        // @ts-ignore
                        preloaded: await processor.loadFilterData({
                            configuration: config,
                            baseValues: data,
                        })
                    }
                } catch (e) {
                    this.logger.Error(`Failed to load filter data for field`, config, e);

                    return {
                        field: config.field,
                        preloaded: undefined
                    }
                }
            }
        );

        const data = await Promise.all(promises);
        this.logger.Debug(`Loaded filter addition data`, data);

        return data.reduce((result: LoadedAdditionData<T>, item: AdditionDataResponse<T>): LoadedAdditionData<T> => {
            return {
                ...result,
                [item.field]: item.preloaded
            }
        }, {});
    }
}