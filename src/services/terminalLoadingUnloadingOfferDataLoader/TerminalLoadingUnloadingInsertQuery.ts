import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {TerminalLoadingUnloadingOfferStoreDTO} from "./interfaces";
import gql from "graphql-tag";

/**
 * Результат вставки сущностей ПРР услуг терминала
 */
export interface InsertTerminalLoadingUnloadingResponse {
    result: {
        returning: TerminalLoadingUnloadingOfferStoreDTO[]
    }
}

/**
 * Запрос создания сущностей ПРР услуг терминала
 */
export class TerminalLoadingUnloadingInsertQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(entities: TerminalLoadingUnloadingOfferStoreDTO[]) {
        this.variables = null;
        let objects = entities.map(entity => {
            return `{
                offer_conditions: [${entity.offer_conditions.map(o => `"${o}"`).join(",")}],
                allowance_offers: [${entity.allowance_offers.map(o => `"${o}"`).join(",")}],
                loading_shoulder_types: [${entity.loading_shoulder_types.map(o => `"${o}"`).join(",")}],
                unloading_shoulder_types: [${entity.unloading_shoulder_types.map(o => `"${o}"`).join(",")}],
                is_loading_to_unknown_transport: ${entity.is_loading_to_unknown_transport ? 'true' : 'false'},
                is_unloading_from_unknown_transport: ${entity.is_unloading_from_unknown_transport ? 'true' : 'false'},
                service_type: ${entity.service_type}
            }`
        });

        this.query = gql`
            mutation TerminalLoadingUnloadingInsertQuery {
                result: transport_terminal_loading_unloading_offer_insert(
                    objects: [${objects.join(",")}]
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