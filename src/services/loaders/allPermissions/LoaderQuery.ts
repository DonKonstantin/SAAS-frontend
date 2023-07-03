import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {PermissionCategoryData} from "../allPermissionCategories/LoaderQuery";

// Данные разрешения
export interface PermissionData {
    id: string
    name: string
    code: string
    category_id: string
    category: PermissionCategoryData
}

// Результат выполнения запроса
export interface LoaderQueryResponse {
    permissions: PermissionData[]
}

/**
 * Запрос загрузки данных по доменам и проектам
 */
export class LoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            query Permissions {
              permissions: permission_list(limit: 100000, order:[{by: name, direction: asc}]) {
                id
                name
                code
                category_id
                category {
                  id
                  name
                  level
                }
              }
            }
        `
    }
}