import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Элемент результата выполнения запроса
 */
export interface TerminalLoadingUnloadingOfferResponse {
    id: string
    loading_shoulder_types: string[]
    is_loading_to_unknown_transport: boolean
    unloading_shoulder_types: string[]
    is_unloading_from_unknown_transport: boolean
    offer_conditions: string[]
    allowance_offers: string[]
    service_type: string
}

/**
 * Результат выполнения запроса
 */
export interface TerminalLoadingUnloadingOfferResponseResult {
    result: TerminalLoadingUnloadingOfferResponse[]
}

/**
 * Запрос получения условий ПРР по переданным ID
 */
export class TerminalLoadingUnloadingOfferDataQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids: any[]) {
        this.variables = null;
        this.query = gql`
            query TerminalLoadingUnloadingOffersLoading {
                result:transport_terminal_loading_unloading_offer_list(
                    where:{id:{_in:[${ids.map(id => `"${id}"`).join(`,`)}]}},
                    order:[{by:id,direction:asc,priority:1}],
                    limit: 10000000,
                ) {
                    id
                    loading_shoulder_types
                    is_loading_to_unknown_transport
                    unloading_shoulder_types
                    is_unloading_from_unknown_transport
                    offer_conditions
                    allowance_offers
                    service_type
                }
            }
        `
    }
}