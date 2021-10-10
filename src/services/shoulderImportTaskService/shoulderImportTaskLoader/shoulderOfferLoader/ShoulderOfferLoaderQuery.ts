import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса загрузки ЦП
export type ShoulderOfferLoaderQueryResponse = {
    result: {
        import_id: string
        id: string | null
        shoulder_id: string
        cargo_type_group: string
        containers: string[]
        container_affiliation_id: number | null
        container_nominal_weight: number
        is_danger_cargo_allowed: boolean
        loading_condition_id: string
        unloading_condition_id: string
        offer_conditions: string[]
        allowance_offers: string[]
        free_time_for_container_usage_on_start_terminal: number
        free_time_for_container_usage_on_end_terminal: number
        active_from: string
        active_to: string
        delivery_modes: string[]
        is_empty_container_returning_included: boolean
        is_empty_container_collecting_included: boolean
        delivery_time: number
    }[]
};

// Запрос загрузки ЦП по переданным ID
export class ShoulderOfferLoaderQuery implements GraphQLQuery<{ids: string[]}> {
    readonly query: any;
    readonly variables: { ids: string[] };

    constructor(ids: string[]) {
        this.variables = {ids};
        this.query = gql`
            query($ids:[ID]) {
              result: import_transport_shoulder_offer_list(
                where:{shoulder_id:{_in:$ids}}
                limit: 10000000
              ) {
                import_id
                id
                shoulder_id
                cargo_type_group
                containers
                container_affiliation_id
                container_nominal_weight
                is_danger_cargo_allowed
                loading_condition_id
                unloading_condition_id
                offer_conditions
                allowance_offers
                free_time_for_container_usage_on_start_terminal
                free_time_for_container_usage_on_end_terminal
                active_from
                active_to
                delivery_modes
                is_empty_container_returning_included
                is_empty_container_collecting_included
                delivery_time
              }
            }
        `
    }
}