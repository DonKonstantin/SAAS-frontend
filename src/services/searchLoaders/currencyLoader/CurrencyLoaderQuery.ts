import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные валюты
export interface CurrencyData {
    id: string
    default_name: string
    glyph: string
    code: string
    is_default_for_services: boolean
    is_default_for_transport: boolean
}

export interface CurrencyLoaderQueryResponse {
    items: CurrencyData[]
}

/**
 * Запрос загрузки данных по валют
 */
export class CurrencyLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadCurrencies {
                items: currency_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                    glyph
                    code
                    is_default_for_services
                    is_default_for_transport
                }
            }
        `
    }
}