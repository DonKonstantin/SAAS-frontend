import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса поиска дочерних сущностей
export interface GetChildrenQueryResponse  {
    children: {primaryKey: any}[]
}

/**
 * Запрос получения списка дочерних элементов
 */
export class GetChildrenQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(method: string, key: string, primaryKey: string | number, primaryKeyValue: any) {
        const query = `query __GET_CHILDREN__ {children: ${method}(${key}: ${primaryKeyValue}){primaryKey: ${primaryKey}}}`

        this.query = gql`${query}`
        this.variables = null
    }
}