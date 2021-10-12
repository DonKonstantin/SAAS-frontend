import {LoadParameters, RelationVariantsDataLoaderInterface} from "./interfaces";
import {GraphQLClient, GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {Logger} from "../logger/Logger";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";
import gql from "graphql-tag";
import {Schemas} from "../../settings/schema";
import {GraphQlSchemaValueConverterInterface} from "../graphQlSchemaValueConverter/interfaces";
import {graphQlSchemaValueConverter} from "../graphQlSchemaValueConverter";

/**
 * Сервис загрузки данных для полей отношений
 */
export class RelationVariantsDataLoader implements RelationVariantsDataLoaderInterface {
    private readonly client: GraphQLClient
    private readonly logger: Logger = loggerFactory().make(`RelationVariantsDataLoader`)
    private readonly valueConverter: GraphQlSchemaValueConverterInterface = graphQlSchemaValueConverter()

    /**
     * Конструктор сервиса
     */
    constructor() {
        this.client = graphQLClient()
    }

    /**
     * Загружает варианты отображения полей отношений
     * @param params
     */
    async Load<T extends keyof Schemas>(params: LoadParameters<T>): Promise<any[]> {
        try {
            const config = (new Schemas())[params.schema]
            const order = params.captionFields.map((field, i) => `{by: ${field}, direction: asc, priority: ${i + 1}}`)
            const query = `query __LOAD_RELATION_DATA__ {${params.schema}: ${params.schema}_list(order: [${order.join(",")}], limit: 100000) {primaryKey: ${params.primaryKey}, ${params.captionFields.join(",")}}}`

            this.logger.Debug(`generated query`, query)

            const response = await this.client.Query<any, any>(new class implements GraphQLQuery<any> {
                readonly query: any = gql`${query}`;
                readonly variables: any = null;
            }, {})

            this.logger.Debug(`gotten response from server`, query)

            if (!response[params.schema]) return []

            const result = response[params.schema].map((option: any) => {
                // @ts-ignore
                let result: {[K: string]: any} = {}

                // @ts-ignore
                result.primaryKey = this.valueConverter.convertValueFromGraphQL(config.fields[params.primaryKey], option.primaryKey)
                params.captionFields.map(field => {
                    // @ts-ignore
                    result[field] = this.valueConverter.convertValueFromGraphQL(config.fields[field], option[field])
                })

                return result
            })

            this.logger.Debug(`parsed result`, result)

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
        }

        return []
    }
}