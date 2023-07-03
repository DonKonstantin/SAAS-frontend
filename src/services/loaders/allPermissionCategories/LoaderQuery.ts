import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные категории разрешения
export interface PermissionCategoryData {
    id: string
    name: string
    level: "realm" | "domain" | "project"
}

// Результат выполнения запроса
export interface LoaderQueryResponse {
    categories: PermissionCategoryData[]
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
            query PermissionCategories {
              categories: permission_category_list(limit: 100000, order:[{by: name, direction: asc}]) {
                id
                name
                level
              }
            }
        `
    }
}