import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {Schemas} from "../../settings/schema";
import gql from "graphql-tag";

// Тип, описывающий поле схемы сущностей GraphQL
type Field<T extends keyof Schemas> = keyof Schemas[T]["fields"]

// Реузльтат выполнения запроса получения не типизированного списка сущностей
export interface LoadFirstTenEntitiesQueryResponse<T extends keyof Schemas> {
    result: {[P in Field<T>]: any}[]
}

/**
 * Класс запроса получения первых 10 элементов не типизированных сущностей
 */
export class LoadFirstTenEntitiesQuery<T extends keyof Schemas> implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(
        schema: T,
        primaryKey: Field<T>,
        fieldsToLoad: Field<T>[],
    ) {
        this.variables = null;
        this.query = gql`
            query __LOAD_UNTYPED_ENTITIES__ {
                result: ${schema}_list(
                    limit: 10,
                    order:[{by:${primaryKey}, priority:1, direction:asc}]
                ) {
                    primaryKey: ${primaryKey}, ${fieldsToLoad.join(",")}
                }
            }
        `;
    }
}