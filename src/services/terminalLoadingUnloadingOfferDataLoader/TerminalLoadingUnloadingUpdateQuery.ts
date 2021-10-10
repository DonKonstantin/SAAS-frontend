import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {TerminalLoadingUnloadingOfferStoreDTO} from "./interfaces";
import gql from "graphql-tag";

/**
 * Результат обновления сущности ПРР услуги терминала
 */
export interface UpdateTerminalLoadingUnloadingResponse {
    result: {
        returning: TerminalLoadingUnloadingOfferStoreDTO[]
    }
}

/**
 * Запрос обновления сущности ПРР услуги терминала
 */
export class TerminalLoadingUnloadingUpdateQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(entity: TerminalLoadingUnloadingOfferStoreDTO) {
        this.variables = null;
        this.query = gql`
            mutation TerminalLoadingUnloadingUpdateQuery {
                result: transport_terminal_loading_unloading_offer_update(
                    set: {
                        offer_conditions: [${entity.offer_conditions.map(o => `"${o}"`).join(",")}],
                        allowance_offers: [${entity.allowance_offers.map(o => `"${o}"`).join(",")}],
                        loading_shoulder_types: [${entity.loading_shoulder_types.map(o => `"${o}"`).join(",")}],
                        unloading_shoulder_types: [${entity.unloading_shoulder_types.map(o => `"${o}"`).join(",")}],
                        is_loading_to_unknown_transport: ${entity.is_loading_to_unknown_transport ? 'true' : 'false'},
                        is_unloading_from_unknown_transport: ${entity.is_unloading_from_unknown_transport ? 'true' : 'false'},
                        service_type: ${entity.service_type}
                    },
                    where: {id: {_equals: ${`"${entity.id}"`}}}
                ) {
                    returning {
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
            }
        `
    }
}