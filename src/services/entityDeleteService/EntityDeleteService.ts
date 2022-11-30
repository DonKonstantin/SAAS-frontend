import {EntityDeleteServiceInterface} from "./interfaces";
import {Schemas} from "../../settings/schema";
import {ListLoadingParameters} from "../listDataLoader/listLoader/interfaces";
import {Logger, LoggerFactory} from "../logger/Logger";
import getPrimaryKeyForSchema from "../helpers/GetPrimaryKeyForSchema";
import {SchemaValueConverterInterface} from "../schemaValueConverter/interfaces";
import {GraphQLClient, GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {listSchemaConfiguration} from "../../settings/pages";
import {ListPageConfiguration} from "../../settings/pages/system/list";

/**
 * Сервис удаления сущностей
 */
export class EntityDeleteService implements EntityDeleteServiceInterface {
    private readonly logger: Logger
    private readonly valueConverter: SchemaValueConverterInterface
    private readonly client: GraphQLClient

    /**
     * Конструктор сервиса
     * @param logger
     * @param valueConverter
     * @param client
     */
    constructor(logger: LoggerFactory, valueConverter: SchemaValueConverterInterface, client: GraphQLClient) {
        this.logger = logger.make(`EntityDeleteService`)
        this.valueConverter = valueConverter
        this.client = client
    }

    /**
     * Удаление сущностей по переданному списку ID
     * @param params
     * @param items
     */
    async DeleteItemsById<T extends keyof Schemas>(params: ListLoadingParameters<T>, items: any[]): Promise<boolean> {
        try {
            // @ts-ignore
            const schemaConfig: ListPageConfiguration<any> = listSchemaConfiguration()[params.schema]
            const deleteSchema = schemaConfig.deleteSchema ? schemaConfig.deleteSchema : params.schema

            const primaryKey = getPrimaryKeyForSchema(deleteSchema)
            const ids: string[] = items.map(item => this.valueConverter.convertValueToGraphQL(primaryKey.field.type, item))

            this.logger.Debug(`Query parameters`, primaryKey, ids)
            // @ts-ignore
            const mutation = `mutation __DELETE_ENTITY__ {${deleteSchema}_delete(where: {${primaryKey.code}: {_in: [${ids.join(",")}]}}) {affected_rows}}`
            this.logger.Debug(`Generated mutation`, mutation)

            await this.client.Mutation<any, any>(new class implements GraphQLQuery<any> {
                readonly query: any = gql`${mutation}`;
                readonly variables: any = null;
            }, {})

            this.logger.Debug(`Successfully executed delete query`)

            return true
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
            return false
        }
    }
}