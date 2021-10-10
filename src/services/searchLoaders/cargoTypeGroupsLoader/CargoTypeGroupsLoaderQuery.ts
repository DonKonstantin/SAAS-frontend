import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные контейнеров
export interface CargoTypeGroupsData {
    id: string
    default_name: string
}

export interface CargoTypeGroupsLoaderQueryResponse {
    items: CargoTypeGroupsData[]
}

/**
 * Запрос загрузки данных по группам типов груза
 */
export class CargoTypeGroupsLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadCargoTypeGroups {
                items: transport_cargo_type_group_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                }
            }
        `
    }
}