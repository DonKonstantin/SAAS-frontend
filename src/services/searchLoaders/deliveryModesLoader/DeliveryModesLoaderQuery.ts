import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные контейнеров
export interface DeliveryModesData {
    id: string
    default_name: string
}

export interface DeliveryModesLoaderQueryResponse {
    items: DeliveryModesData[]
}

/**
 * Запрос загрузки данных по группам типов груза
 */
export class DeliveryModesLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadDeliveryModes {
                items: transport_delivery_mod_list(
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