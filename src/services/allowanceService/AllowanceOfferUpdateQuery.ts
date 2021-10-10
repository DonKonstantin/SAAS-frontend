import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {AllowanceOffer} from "./interfaces";
import gql from "graphql-tag";
import {PriceCondition} from "../priceConditionsService/interface";

// Результат выполнения запроса обновления
export interface AllowanceOfferUpdateQueryResponse {
    update: {
        items: {id: string}[]
    }
}

// Запрос обновления надбавки
export class AllowanceOfferUpdateQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(allowanceOffer: AllowanceOffer) {
        this.variables = null;
        this.query = gql`
            mutation UpdateAllowance {
                update: transport_allowance_offer_update(set: {
                    allowance_id: "${allowanceOffer.allowance.id}",
                    is_invoice_allowance: ${allowanceOffer.isInvoiceAllowance ? "true" : "false"},
                    offer_conditions:[${allowanceOffer.offerConditions.reduce((result: string[], condition: PriceCondition): string[] => [...result, `"${condition.id}"`], []).join(`,`)}]
                }, where:{id:{_equals:"${allowanceOffer.id}"}}) {
                    items: returning {
                        id
                    }
                }
            }
        `
    }
}