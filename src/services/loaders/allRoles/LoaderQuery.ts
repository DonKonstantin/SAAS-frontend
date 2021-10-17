import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные роли
export interface RoleData {
    id: string
    name: string
    level: "realm" | "domain" | "project"
    permissions_id: string[]
    structure_item_id: string
}

// Результат выполнения запроса
export interface LoaderQueryResponse {
    roles: RoleData[]
}

/**
 * Запрос загрузки данных по ролям
 */
export class LoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            query Roles {
              roles: role_list(limit: 100000) {
                id
                name
                level
                permissions_id
                structure_item_id
              }
            }
        `
    }
}