import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import {ShoulderOffer} from "../../../shoulderImportTaskService/shoulderTypes";
import gql from "graphql-tag";

// Результат выполнения запроса поиска сущностей
export interface ShoulderOfferSearchServiceQueryResponse {
    result: {
        id: string
        delivery_modes: string[]
        containers: string[]
    }[]
}

// Переменные для запроса
export type Variables = ShoulderOffer & {
    shoulder_id: string
}

/**
 * Запрос получения списка ЦП по переданным параметрам
 */
export class ShoulderOfferSearchServiceQuery implements GraphQLQuery<Variables> {
    readonly query: any;
    readonly variables: Variables;

    constructor(shoulderId: string, offer: ShoulderOffer) {
        this.variables = {
            shoulder_id: shoulderId,
            ...offer,
        };
        this.query = gql`
            query(
              $cargo_type_group: ID!,
              $containers:[ID],
              $container_affiliation_id:NullableInt,
              $container_nominal_weight:Float,
              $is_danger_cargo_allowed:Boolean,
              $loading_condition_id: ID!, 
              $unloading_condition_id: ID!, 
              $active_to: DateTime!, 
              $active_from: DateTime!,
              $shoulder_id: ID!,
              $delivery_modes:[ID],
            ) {
              result: transport_shoulder_offer_list(
                where:{
                  cargo_type_group:{_equals:$cargo_type_group},
                  containers:{_in:$containers},
                  container_affiliation_id:{_equals:$container_affiliation_id},
                  container_nominal_weight:{_equals:$container_nominal_weight},
                  is_danger_cargo_allowed:{_equals:$is_danger_cargo_allowed},
                  loading_condition_id:{_equals:$loading_condition_id},
                  unloading_condition_id:{_equals:$unloading_condition_id},
                  active_to:{_equals:$active_to},
                  active_from:{_equals:$active_from},
                  shoulder_id:{_equals:$shoulder_id},
                  delivery_modes:{_in:$delivery_modes},
                },
                limit: 1000000
              ) {
                id
                delivery_modes
                containers
              }
            }
        `
    }
}