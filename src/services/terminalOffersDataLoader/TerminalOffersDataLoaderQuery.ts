import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Базовая сущность услуги терминала
 */
export interface TerminalOffersDataLoaderQueryResponseItem {
    id: string
    terminal_id: string
    cargo_type_group: string
    delivery_modes: string[]
    containers: string[]
    loading_offers: string[]
}

/**
 * Результат выполнения запроса получения листинга услуг терминала
 */
export interface TerminalOffersDataLoaderQueryResponse {
    result: TerminalOffersDataLoaderQueryResponseItem[]
}

/**
 * Запрос получения листинга услуг терминала
 */
export class TerminalOffersDataLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(terminalIds: any[]) {
        this.variables = null;
        this.query = gql`
            query TerminalOffersLoading {
                result:transport_terminal_offer_list(
                    where:{terminal_id:{_in:[${terminalIds.map(id => `"${id}"`).join(`,`)}]}},
                    order:[{by:id,direction:asc,priority:1}],
                    limit: 10000000,
                ) {
                    id
                    terminal_id
                    cargo_type_group
                    containers
                    delivery_modes
                    loading_offers
                }
            }
        `
    }
}