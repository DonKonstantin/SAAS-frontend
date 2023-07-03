import {FilterValueLoaderInterface, FilterValueLoaderParameters, LoadedFilterValues} from "./interfaces";
import {Schemas} from "../../../../settings/schema";
import {AvailableFilterField, BaseFilterFieldConfiguration} from "../types";
import {ValueLoadProcessors} from "./processors";
import {Logger, LoggerFactory} from "../../../logger/Logger";

/**
 * Загрузчик базовых данных для переданных полей
 */
export class FilterValueLoader implements FilterValueLoaderInterface {
    private readonly processors: ValueLoadProcessors
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param processors
     * @param logger
     */
    constructor(processors: ValueLoadProcessors, logger: LoggerFactory) {
        this.processors = processors;
        this.logger = logger.make(`FilterValueLoader`);
    }

    /**
     * Загрузка базовых данных
     * @param params
     */
    Load<T extends keyof Schemas>(params: FilterValueLoaderParameters<T>): LoadedFilterValues<T> {
        const result = Object.values(params.configuration).reduce(
            (
                result: LoadedFilterValues<T>,
                config: BaseFilterFieldConfiguration<T, keyof Schemas[T]['fields'], AvailableFilterField>
            ): LoadedFilterValues<T>  => {
                const data = params.baseData[config.field]
                const processor = this.processors[config.filterType]

                return {
                    ...result,
                    // @ts-ignore
                    [config.field]: processor.loadValue<T>(config, data)
                }
            },
            {}
        )

        this.logger.Debug(`Generated filter values`, result)

        return result
    }
}