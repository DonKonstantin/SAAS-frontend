import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные контейнеров
export interface ContainersData {
    id: string
    default_name: string
    is_default_for_container_type: boolean
}

export interface ContainersLoaderQueryResponse {
    items: ContainersData[]
}

/**
 * Запрос загрузки данных по контейнерам
 */
export class ContainersLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadContainers {
                items: transport_container_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                    is_default_for_container_type
                }
            }
        `
    }
}