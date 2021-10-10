import {FilterGeneratorInterface} from "./interfaces";
import {ListLoadingParameters} from "../../interfaces";
import {Schemas} from "../../../../../settings/schema";
import {FilterGeneratorProcessors} from "./processors";
import {LoadedFilterValues} from "../../../filterLoader/filterValueLoader/interfaces";
import {LoadedFilterData} from "../../../filterLoader/interfaces";
import {FilterFieldComponents} from "../../../filterLoader/types";
import {ListPageConfiguration} from "../../../../../settings/pages/system/list";
import {listSchemaConfiguration} from "../../../../../settings/pages";

/**
 * Генератор подзапроса фильтрации
 */
export class FilterGenerator implements FilterGeneratorInterface {
    private readonly processors: FilterGeneratorProcessors;

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(processors: FilterGeneratorProcessors) {
        this.processors = processors
    }

    /**
     * Генерация подстроки фильтрации запроса листинга
     * @param parameters
     */
    GenerateFilter<T extends keyof Schemas>(parameters: ListLoadingParameters<T>): string {
        // @ts-ignore
        const config: ListPageConfiguration<any> = listSchemaConfiguration()[parameters.schema];

        // @ts-ignore
        const current: LoadedFilterValues<T> = parameters.currentFilterValues;
        // @ts-ignore
        const origin: LoadedFilterValues<T> = parameters.originalFilterValues;

        let queries: string[] = [];
        if (JSON.stringify(parameters.currentFilterValues) !== JSON.stringify(parameters.originalFilterValues)
            && !!parameters.currentFilterValues
            && !!parameters.originalFilterValues
        ) {
            Object.keys(current).map(<F extends keyof Schemas[T]['fields']>(key: F) => {
                // @ts-ignore
                const currentValue: LoadedFilterData<keyof FilterFieldComponents, T, F> = current[key];
                // @ts-ignore
                const originValue: LoadedFilterData<keyof FilterFieldComponents, T, F> = origin[key];

                // @ts-ignore
                const query: string = this.processors[currentValue.configuration.filterType].GenerateFilter({
                    currentValue: currentValue,
                    originalValue: originValue,
                });

                if (0 !== query.length) {
                    queries.push(query)
                }
            });
        }

        const parts: string[] = [];
        if (queries.length > 0) {
            parts.push(queries.join(","))
        }

        if (config.additionFilter) {
            parts.push(config.additionFilter);
        }

        Object.keys(parameters.additionFilter).map(field => {
            parts.push(`${field}: ${parameters.additionFilter[field]}`)
        });

        if (0 === parts.length) {
            return ""
        }

        return `where: {_and: [${parts.map(p => `{${p}}`).join(",")}]}`
    }
}