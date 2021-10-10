import {FilterBaseValuesLoaderInterface, LoadedFiltersBaseData} from "./interfaces";
import {Schemas} from "../../../../settings/schema";
import {AvailableFilterField, BaseFilterFieldConfiguration, FilterFieldsConfiguration} from "../types";
import {BaseLoadProcessors} from "./processors";
import {Collection} from "../../../types";
import {GraphQLClient, GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {Logger, LoggerFactory} from "../../../logger/Logger";
import {listSchemaConfiguration} from "../../../../settings/pages";
import {ListPageConfiguration} from "../../../../settings/pages/system/list";

/**
 * Загрузчик базовых данных для переданных полей
 */
export class FilterBaseValuesLoader implements FilterBaseValuesLoaderInterface {
    private readonly processors: BaseLoadProcessors;
    private readonly graphQlClient: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор службы
     * @param processors
     * @param graphQlClient
     * @param logger
     */
    constructor(processors: BaseLoadProcessors, graphQlClient: GraphQLClient, logger: LoggerFactory) {
        this.processors = processors;
        this.graphQlClient = graphQlClient;
        this.logger = logger.make(`FilterBaseValuesLoader`)
    }

    /**
     * Загрузка базовых данных
     * @param configuration
     * @param additionFilter
     */
    async Load<T extends keyof Schemas>(
        configuration: FilterFieldsConfiguration<T>,
        additionFilter: {[T: string]: string},
    ): Promise<LoadedFiltersBaseData<T>> {
        try {
            const query = this.generateQuery(configuration, additionFilter);
            this.logger.Debug(`Generated query`, query);

            let resp: any = null;
            if (0 !== query.length) {
                const response = await this.graphQlClient.Query<undefined, any>(new class implements GraphQLQuery<undefined> {
                    readonly query: any = gql`${query}`;
                    readonly variables: undefined;
                }, {});

                this.logger.Debug(`Response from server`, response);

                const schema: keyof Schemas = Object.values(configuration)[0].schema;
                resp = response[`${schema}_aggregate`][0] ? response[`${schema}_aggregate`][0] : undefined
            }

            this.logger.Debug(`Response data`, resp);

            const result = Object.values(configuration).reduce(
                (
                    result: LoadedFiltersBaseData<T>,
                    config: BaseFilterFieldConfiguration<T, keyof Schemas[T]['fields'], AvailableFilterField>
                ): LoadedFiltersBaseData<T> => {
                    const processor = this.processors[config.filterType];
                    if (!processor) return {...result};

                    // @ts-ignore
                    const data = processor.parseBaseQueryResult(config.schema, config.field, config.filterType, resp);

                    return {
                        ...result,
                        [config.field]: data,
                    }
                },
                {}
            );

            this.logger.Debug(`Parsed base fields data`, result);

            return result
        } catch (e) {
            this.logger.Error(`Error on filter base values load`, e);
            return {};
        }
    }

    /**
     * Генерация GraphQL запроса базовых полей
     * @param configuration
     * @param additionFilter
     */
    private generateQuery<T extends keyof Schemas>(
        configuration: FilterFieldsConfiguration<T>,
        additionFilter: {[T: string]: string},
    ): string {
        type fieldKey = keyof Schemas[T]['fields']
        let schema: keyof Schemas;
        let operationsCollection: Collection<fieldKey[]> = {};
        Object.values(configuration).map(
            (config: BaseFilterFieldConfiguration<T, keyof Schemas[T]['fields'], AvailableFilterField>) => {
                schema = config.schema;

                const processor = this.processors[config.filterType];
                processor.getOperationsForField().map(operation => {
                    if (!operationsCollection[operation]) {
                        operationsCollection[operation] = []
                    }

                    operationsCollection[operation].push(config.field)
                })
            }
        );

        this.logger.Debug(`Operations to query`, operationsCollection);

        if (0 === Object.keys(operationsCollection).length) {
            return ""
        }

        const operationQueries = Object.keys(operationsCollection).map((key: keyof Collection<fieldKey[]>): string => {
            const fields = operationsCollection[key].join(", ");
            return `${key} {${fields}}`
        });

        // @ts-ignore
        const config: ListPageConfiguration<any> = listSchemaConfiguration()[schema];

        let filter: string[] = [];
        if (config.additionFilter) {
            filter.push(config.additionFilter)
        }

        Object.keys(additionFilter).map(field => {
            filter.push(`${field}: ${additionFilter[field]}`)
        });

        // @ts-ignore
        return `query __FilterData__ {${schema}_aggregate${filter.length > 0 ? `(where: {${filter.join(",")}})` : ``}{${operationQueries.join(", ")}}}`
    }
}