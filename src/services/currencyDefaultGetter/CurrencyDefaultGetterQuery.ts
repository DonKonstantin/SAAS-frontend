import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Результат запроса получения дефолтных валют
 */
export interface CurrencyDefaultGetterQueryResponse {
    currencies: {
        id: string
        is_default_for_services: boolean
        is_default_for_transport: boolean
    }[]
}

/**
 * Запрос получения дефолтных валют
 */
export class CurrencyDefaultGetterQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null
        this.query = gql`
            query __CURRENCY_DEF__ {
                currencies: currency_list(where:{
                    _or: [
                        {is_default_for_services: {_equals: true}},
                        {is_default_for_transport: {_equals: true}}
                    ]
                }) {
                    id
                    is_default_for_services
                    is_default_for_transport
                }
            }
        `
    }
}