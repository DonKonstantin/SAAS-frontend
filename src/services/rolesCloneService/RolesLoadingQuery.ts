import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные роли, доступные для копирования
export type RoleCopyData = {
    name: string
    structure_item_id: string
    permissions_id: string[]
}

// Результат выполнения запроса
export type RolesLoadingQueryResponse = {
    result: RoleCopyData[]
}

/**
 * Запрос получения списка ролей
 */
export class RolesLoadingQuery implements GraphQLQuery<{ ids: string[] }> {
    readonly query: any;
    readonly variables: { ids: string[] };

    constructor(ids: string[]) {
        this.variables = {ids}
        this.query = gql`
            query LoadRoles($ids:[ID!]) {
              result: role_list(where:{id:{_in: $ids}}) {
                name
                structure_item_id
                permissions_id
              }
            }
        `
    }
}