import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {Schemas} from "../../settings/schema";
import gql from "graphql-tag";

// Тип, описывающий поле схемы сущностей GraphQL
type Field<T extends keyof Schemas> = keyof Schemas[T]["fields"]

// Реузльтат выполнения запроса получения не типизированного списка сущностей
export interface SearchUntypedLoaderQueryResponse<T extends keyof Schemas> {
    result: {[P in Field<T>]: any}[]
}

/**
 * Запрос получения листинга не типизированных сущностей
 */
export class SearchUntypedLoaderQuery<T extends keyof Schemas> implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(
        ids: any[],
        schema: T,
        primaryKey: Field<T>,
        fieldsToLoad: Field<T>[],
    ) {
        this.variables = null;
        this.query = gql`
            query __LOAD_UNTYPED_ENTITIES__ {
                result: ${schema}_list(
                    where: {${primaryKey}: {_in: [${ids.join(",")}]}},
                    limit: ${ids.length},
                ) {
                    primaryKey: ${primaryKey}, ${fieldsToLoad.join(",")}
                }
            }
        `;
    }
}