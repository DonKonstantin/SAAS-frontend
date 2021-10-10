import {SchemaField, Schemas} from "../../settings/schema";
import {
    RelationLoadParams,
    RelationSearchServiceInterface,
    RelationSearchServiceParams,
    Result
} from "./interfaces";
import {SearchUntypedLoaderInterface, SearchUntypedLoaderItem} from "../searchUntypedLoader/interfaces";
import {searchUntypedLoader} from "../searchUntypedLoader";
import {GraphQLClient, GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import {RelationSearchQuery, RelationSearchQueryResponse} from "./RelationSearchQuery";
import gql from "graphql-tag";
import {ChooseVariant, SearchFilterFieldConfiguration} from "../listDataLoader/filterLoader/types";

/**
 * Поиск сущностей по переданным параметрам
 */
export class RelationSearchService<T extends keyof Schemas> implements RelationSearchServiceInterface<T> {
    private readonly schema: Schemas;
    private readonly client: GraphQLClient;
    private readonly untypedLoader: SearchUntypedLoaderInterface<T>;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     */
    constructor(token?: string) {
        this.schema = new Schemas();
        this.client = graphQLClient(token);
        this.untypedLoader = searchUntypedLoader(token);
        this.logger = loggerFactory().make(`RelationSearchService`)
    }

    /**
     * Поиск сущностей по переданным параметрам
     * @param searchString
     * @param configuration
     */
    async searchRelationsBySearchString<T extends keyof Schemas,
        F extends keyof Schemas[T]["fields"]>(
        searchString: string,
        configuration: SearchFilterFieldConfiguration<T, F, any>
    ): Promise<ChooseVariant[]> {
        let result: ChooseVariant[] = [];
        if (0 === searchString.length) {
            return result
        }

        try {
            const schemaConfig: SchemaField = this.schema[configuration.schema].fields[configuration.field as string];
            const targetKey = schemaConfig.relation?.target;

            if (!targetKey || 0 === configuration.relationConfiguration.visibleFields.length) return result;

            const filters = configuration.searchFields.map(field => {
                return `{${field as string}: {_like: "%${searchString}%"}}`
            });

            const orders = configuration.searchFields.map((field, i) => {
                return `{by: ${field as string}, direction: asc, priority: ${i}}`
            });

            const table = `${configuration.relationConfiguration.schema}_list`;
            const query = `
                query __FILTER_ADDITION_DATA__ {
                    ${table}(
                        where: {_or:[${filters.join(",")}]}
                        order: [${orders.join(",")}]
                        limit: 150
                    ) {
                        ${String(targetKey)}
                        ${configuration.relationConfiguration.visibleFields.join(", ")}
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
            if (!resp || !Array.isArray(resp)) {
                return result;
            }

            result = resp
                .map((data: any): ChooseVariant | undefined => {
                    let item = new ChooseVariant();
                    if (!data[String(targetKey)]) return;

                    item.key = data[String(targetKey)];

                    let title: string[] = [];
                    const {visibleFields, joinSymbol = ", "} = configuration.relationConfiguration;
                    visibleFields.map(field => {
                        title.push(`${data[field]}`)
                    });

                    item.title = title.join(joinSymbol);

                    return item
                })
                .filter(variant => variant !== undefined) as ChooseVariant[]
            ;

            this.logger.Debug(`Parsed results`, result);

            return result;
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
        }

        return result;
    }

    /**
     * Поиск сущностей по переданным параметрам
     * @param params
     */
    async SearchEntities(params: RelationSearchServiceParams<T>): Promise<Result<T>> {
        if (0 === params.searchPhrase.length) {
            return {id: params.id, items: []}
        }

        try {
            const searchResponse = await this.client.Query<null, RelationSearchQueryResponse>(new RelationSearchQuery(
                params.searchPhrase,
                [params.searchEntityType],
            ), {});

            this.logger.Debug(`Search result`, searchResponse);

            if (0 === searchResponse.searchLocalizedEntities.length) {
                return {id: params.id, items: []}
            }

            const entities = await this.untypedLoader.LoadEntitiesById({
                fieldsToLoad: [params.primaryKey, ...params.fieldsToLoad],
                ids: searchResponse.searchLocalizedEntities.reduce((result, response) => {
                    return [...result, response.entityId]
                }, []),
                primaryKey: params.primaryKey,
                schema: params.schema,
            });

            this.logger.Debug(`Loaded entities`, entities);

            const result = searchResponse.searchLocalizedEntities
                .map(entity => {
                    return entities.find(i => `${i.fields[params.primaryKey]}` === entity.entityId)
                })
                .filter(i => !!i) as SearchUntypedLoaderItem<T>[];

            this.logger.Debug(`Built response`, result);

            return {id: params.id, items: result};
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return {id: params.id, items: []}
        }
    }

    /**
     * Загрузка списка сущностей по переданным ID
     * @param params
     */
    async LoadEntitiesByPrimaryKey(params: RelationLoadParams<T>): Promise<Result<T>> {
        if (0 === params.primaryKeyValue.length) {
            return {id: params.id, items: []}
        }

        try {
            const entities = await this.untypedLoader.LoadEntitiesById({
                fieldsToLoad: [params.primaryKey, ...params.fieldsToLoad],
                ids: params.primaryKeyValue,
                primaryKey: params.primaryKey,
                schema: params.schema,
            });

            this.logger.Debug(`Loaded entities`, entities);

            const result = entities as SearchUntypedLoaderItem<T>[];
            this.logger.Debug(`Built response`, result);

            return {id: params.id, items: result};
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return {id: params.id, items: []}
        }
    }
}