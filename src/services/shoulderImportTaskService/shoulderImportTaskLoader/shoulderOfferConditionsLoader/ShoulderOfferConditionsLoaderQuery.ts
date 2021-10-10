import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {ShoulderOfferCondition} from "../../shoulderTypes";

// Результат выполнения запроса
export type ShoulderOfferConditionsLoaderQueryResponse = {
    result: ShoulderOfferCondition[]
};

// Запрос поиска условий ЦП по переданным ID
export class ShoulderOfferConditionsLoaderQuery implements GraphQLQuery<{ids: string[]}>{
    readonly query: any;
    readonly variables: { ids: string[] };

    constructor(ids: string[]) {
        this.variables = {ids};
        this.query = gql`
            query($ids:[ID]) {
              result: import_transport_offer_condition_list(
                where:{import_id:{_in:$ids}}
                limit: ${ids.length}
              ) {
                import_id
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