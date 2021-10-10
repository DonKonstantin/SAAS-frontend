import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {PriceCondition} from "./interface";

/**
 * Результат запроса получения списка ценовых предложений
 */
export interface PriceConditionLoaderQueryResponse {
    items: PriceCondition[]
}

/**
 * Запрос получения списка ценовых предложений
 */
export class PriceConditionLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids: any[]) {
        this.variables = null
        this.query = gql`
            query LoadPriceConditions {
                items: transport_offer_condition_list(where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}, order:[{by:group_num, direction:asc, priority: 1}, {by:id, direction:asc, priority: 2}], limit:1000000) {
                    id
                    unit_id
                    min_value
                    max_value
                    price
                    information_price
                    tax_id
                    currency_id
                    is_fixed_price
                    is_min_value_not_limited
                    is_max_value_not_limited
                    is_tax_included_in_price
                    group_num
                    minimal_payment_price
                }
            }
        `
    }
}