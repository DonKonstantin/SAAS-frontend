import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные перевозчика
export interface CarrierData {
    id: string
    default_name: string
}

export interface CarrierLoaderQueryResponse {
    items: CarrierData[]
}

/**
 * Запрос загрузки данных по перевозчикам
 */
export class CarrierLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadCarriers {
                items: carrier_list(
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