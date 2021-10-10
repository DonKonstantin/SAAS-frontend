import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {Schemas} from "../../settings/schema";
import getPrimaryKeyForSchema from "../helpers/GetPrimaryKeyForSchema";
import {graphQlSchemaValueConverter} from "../graphQlSchemaValueConverter";
import gql from "graphql-tag";

// Результат выполнения запроса основных данных для сущностей поисковой выдачи
export interface SchemaDataLoadQueryResponse {
    data: any[]
}

/**
 * Запрос загрузки основных сущностей для поисковой выдачи
 */
export class SchemaDataLoadQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(schema: keyof Schemas, fields: string[], entityIds: any[]) {
        const graphQlFieldConverter = graphQlSchemaValueConverter();
        const primaryKey = getPrimaryKeyForSchema(schema);
        const primaryKeyValues = entityIds.map(id => graphQlFieldConverter.convertValueToGraphQL(primaryKey.field, id));
        const query = `query __SCHEMA_SEARCH_DATA__ {
            data: ${schema}_list(where: {${primaryKey.code}: {_in: [${primaryKeyValues.join(",")}]}}, limit: ${primaryKeyValues.length}) {
                primaryKey: ${primaryKey.code}, ${primaryKey.code}, ${fields.join(", ")}
            }
        }`;

        this.query = gql`${query}`;
        this.variables = null
    }
}