import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные принадлежности контейнеров
export interface ContainerAffiliationData {
    id: string
    default_name: string
}

export interface ContainerAffiliationLoaderQueryResponse {
    items: ContainerAffiliationData[]
}

/**
 * Запрос загрузки данных по принадлежности контейнеров
 */
export class ContainerAffiliationLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadDeliveryModes {
                items: transport_container_affiliation_list(
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