import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Базовая сущность ценового предложения
 */
export interface ShoulderOffersDataLoaderQueryResponseItem {
    id: string
    shoulder_id: string
    cargo_type_group: string
    containers: string[]
    container_affiliation_id: number | null
    loading_condition_id: string
    unloading_condition_id: string
    active_from: string
    active_to: string
    offer_conditions: string[]
}

/**
 * Результат выполнения запроса получения листинга ценовых предложений плеч
 */
export interface ShoulderOffersDataLoaderQueryResponse {
    result: ShoulderOffersDataLoaderQueryResponseItem[]
}

/**
 * Запрос получения листинга ценовых предложений плеч
 */
export class ShoulderOffersDataLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(shoulderIds: any[]) {
        this.variables = null;
        this.query = gql`
            query ShoulderOffersLoading {
                result:transport_shoulder_offer_list(
                    where:{shoulder_id:{_in:[${shoulderIds.map(id => `"${id}"`).join(`,`)}]}},
                    order:[{by:id,direction:asc,priority:1}],
                    limit: 10000000,
                ) {
                    id
                    shoulder_id
                    cargo_type_group
                    containers
                    container_affiliation_id
                    loading_condition_id
                    unloading_condition_id
                    active_from
                    active_to
                    offer_conditions
                }
            }
        `
    }
}