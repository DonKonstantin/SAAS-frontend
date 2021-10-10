import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {PriceCondition} from "./interface";
import gql from "graphql-tag";
import {ConvertPriceConditionToGraphQL} from "./PriceConditionGraphQLProcessor";

/**
 * Результат выполнения запроса обновления сущностей
 */
export interface PriceConditionInsertQueryResponse {
    insert: {
        items: PriceCondition[]
    }
}

/**
 * Запрос обновления сущности условия ценового предложения
 */
export class PriceConditionInsertQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(conditions: PriceCondition[]) {
        const conditionsObjects = conditions.map(condition => {
            const processedCondition = ConvertPriceConditionToGraphQL(condition)
            return `{
                unit_id: ${processedCondition.unit_id}
                min_value: ${processedCondition.min_value}
                max_value: ${processedCondition.max_value}
                price: ${processedCondition.price}
                information_price: ${processedCondition.information_price}
                tax_id: ${processedCondition.tax_id}
                currency_id: ${processedCondition.currency_id}
                is_fixed_price: ${processedCondition.is_fixed_price}
                is_min_value_not_limited: ${processedCondition.is_min_value_not_limited}
                is_max_value_not_limited: ${processedCondition.is_max_value_not_limited}
                is_tax_included_in_price: ${processedCondition.is_tax_included_in_price}
                group_num: ${processedCondition.group_num}
                minimal_payment_price: ${processedCondition.minimal_payment_price}
            }`
        })

        this.variables = null
        this.query = gql`
            mutation InsertPriceCondition {
                insert: transport_offer_condition_insert(
                    objects: [${conditionsObjects.join(",")}]
                ) {
                    items: returning {
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
                        minimal_payment_price
                        group_num
                    }
                }
            }
        `
    }
}