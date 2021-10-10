import {FilterLoaderParams, FilterPreloaderProcessorInterface} from "./interfaces";
import {SchemaField, Schemas} from "../../../../../settings/schema";
import {ChooseVariant, DeclaredFilterFieldPreloadedData, RelationVariantsSelectorPreloadData} from "../../types";
import {GraphQLClient, GraphQLQuery} from "../../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {Logger, LoggerFactory} from "../../../../logger/Logger";

/**
 * Загрузчик первоначальных данных для полей поиска
 */
export class SearchPreloader implements FilterPreloaderProcessorInterface<"RelationAutocompleteSearch"> {
    private readonly schema: Schemas;
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор загрузчика
     */
    constructor(client: GraphQLClient, loggerFactory: LoggerFactory) {
        this.schema = new Schemas();
        this.client = client;
        this.logger = loggerFactory.make(`SearchPreloader`)
    }

    /**
     * Загрузка параметров фильтрации
     * @param params
     */
    async loadFilterData<T extends keyof Schemas, F extends keyof Schemas[T]["fields"]>(
        params: FilterLoaderParams<"RelationAutocompleteSearch", T, F>
    ): Promise<DeclaredFilterFieldPreloadedData["RelationAutocompleteSearch"]> {
        let result = new RelationVariantsSelectorPreloadData();
        try {
            const schemaConfig: SchemaField = this.schema[params.configuration.schema].fields[params.configuration.field as string];
            const targetKey = schemaConfig.relation?.target;

            if (!targetKey || 0 === params.configuration.relationConfiguration.visibleFields.length) return result;

            const table = `${params.configuration.relationConfiguration.schema}_list`;
            const query = `
                    query __FILTER_ADDITION_DATA__ {
                        ${table}(
                            limit: 30
                        ) {
                            ${String(targetKey)}
                            ${params.configuration.relationConfiguration.visibleFields.join(", ")}
                        }
                    }
                `;

            this.logger.Debug(`Generated query`, query);

            const response = await this.client.Query<null, any>(new class implements GraphQLQuery<null> {
                readonly query: any = gql`${query}`;
                readonly variables: null = null;
            }, {});

            this.logger.Debug(`Response from server`, response);

            const resp = response[table] ? response[table] : undefined;
            if (!resp || !Array.isArray(resp)) return result;

            result.choseVariants = resp
                .map((data: any): ChooseVariant | undefined => {
                    let item = new ChooseVariant();
                    if (!data[String(targetKey)]) return;

                    item.key = data[String(targetKey)];

                    let title: string[] = [];
                    const {visibleFields, joinSymbol = ", "} = params.configuration.relationConfiguration;
                    visibleFields.map(field => {
                        title.push(`${data[field]}`)
                    });

                    item.title = title.join(joinSymbol);

                    return item
                })
                // @ts-ignore
                .filter<ChooseVariant>(variant => variant !== undefined)
            ;

            this.logger.Debug(`Parsed results`, result)
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
        }

        return result;
    }
}