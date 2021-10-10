import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import {Schemas} from "../../../../settings/schema";
import getPrimaryKeyForSchema from "../../../helpers/GetPrimaryKeyForSchema";
import {graphQlSchemaValueConverter} from "../../../graphQlSchemaValueConverter";
import gql from "graphql-tag";

// Результат выполнения запроса
export interface UniqueCheckResult {
    check: {
        count: number
    }[]
}

// Запрос проверки уникальности поля
export class UniqueCheckQuery<T extends keyof Schemas> implements GraphQLQuery<null>{
    readonly query: any;
    readonly variables: null = null;

    constructor(schema: T, field: keyof Schemas[T]['fields'], fieldValue: any, primaryKey: any) {
        const valueConverter = graphQlSchemaValueConverter()
        const primaryKeyConfig = getPrimaryKeyForSchema(schema)
        // @ts-ignore
        const fieldConfig = (new Schemas())[schema].fields[field]

        const fieldCondition = `${field}: {_equals: ${valueConverter.convertValueToGraphQL(fieldConfig, fieldValue)}}`
        const whereQuery = primaryKey
            ? `where: {_not: {${primaryKeyConfig.code}: {_equals: ${valueConverter.convertValueToGraphQL(primaryKeyConfig.field, primaryKey)}}}, ${fieldCondition}}`
            : `where: {${fieldCondition}}`
        ;

        const query = `query __CHECK_UNIQUE__ {check: ${schema}_aggregate(${whereQuery}) {count}}`

        this.query = gql`${query}`
    }
}