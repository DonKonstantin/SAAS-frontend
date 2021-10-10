import {EntityValuesGetterInterface} from "./interfaces";
import {SchemaField, Schemas} from "../../../settings/schema";
import {EntityValues} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";
import getPrimaryKeyForSchema from "../../helpers/GetPrimaryKeyForSchema";
import {GraphQLClient, GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {Logger} from "../../logger/Logger";
import {loggerFactory} from "../../logger";
import {GraphQlSchemaValueConverterInterface} from "../../graphQlSchemaValueConverter/interfaces";
import {graphQlSchemaValueConverter} from "../../graphQlSchemaValueConverter";

/**
 * Сервис получения данных полей сущности
 */
export class EntityValuesGetter implements EntityValuesGetterInterface {
    private readonly valueConverter: GraphQlSchemaValueConverterInterface
    private readonly client: GraphQLClient
    private readonly logger: Logger

    /**
     * Конструктор сервиса
     */
    constructor(client: GraphQLClient) {
        this.client = client;
        this.valueConverter = graphQlSchemaValueConverter()
        this.logger = loggerFactory().make(`EntityValuesGetter`)
    }

    /**
     * Получение значений полей сущности
     * @param schema
     * @param primaryKey
     * @param initialValues
     */
    async GetEntityValues<T extends keyof Schemas>(schema: T, primaryKey: any, initialValues: EntityValues<T>): Promise<EntityValues<T>> {
        let result: EntityValues<T> = JSON.parse(JSON.stringify(initialValues))

        const schemaConfig = (new Schemas())[schema]
        const primaryKeyConf = getPrimaryKeyForSchema(schema)
        const config = editSchemaConfiguration()[schema]
        if (!config) return result

        let fieldsToLoad: (keyof Schemas[T]['fields'])[] = []
        config.groups.map(group => {
            group.fields.map(field => {
                if (fieldsToLoad.indexOf(field.field) === -1) {
                    fieldsToLoad.push(field.field)
                }
            })
        })

        const id = this.valueConverter.convertValueToGraphQL(primaryKeyConf.field, primaryKey)
        const query = `query __ENTITY_GET__ {${schema}: ${schema}_list(where: {${primaryKeyConf.code}: {_equals: ${id}}}){${fieldsToLoad.join(",")}}}`

        this.logger.Debug(`generated query`, query)

        try {
            const response = await this.client.Query<any, any>(new class implements GraphQLQuery<any> {
                readonly query: any = gql`${query}`;
                readonly variables: any = null;
            }, {})

            this.logger.Debug(`loaded response from server`, response)

            if (!Array.isArray(response[schema]) || 0 === response[schema].length) {
                return result
            }

            fieldsToLoad.map(field => {
                if (response[schema][0][field] !== undefined) {
                    // @ts-ignore
                    const fieldConfig: SchemaField = schemaConfig.fields[field]

                    result[field] = this.valueConverter.convertValueFromGraphQL(fieldConfig, response[schema][0][field])
                } else {
                    this.logger.Warning(`failed to get value from response`, field, response)
                }
            })
        } catch (e) {
            this.logger.Error(`some error occurred`, e)
            return result
        }

        this.logger.Debug(`parsed entity values`, result)

        return result
    }
}