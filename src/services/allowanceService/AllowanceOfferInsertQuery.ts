import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {AllowanceOffer} from "./interfaces";
import {PriceCondition} from "../priceConditionsService/interface";

// Результат выполнения запроса вставки
export interface AllowanceOfferInsertQueryResponse {
    insert: {
        items: {id: string}[]
    }
}

// Запрос вставки надбавок
export class AllowanceOfferInsertQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(allowanceOffers: AllowanceOffer[]) {
        const allowanceOfferObjects = allowanceOffers.map(offer => {
            return `{
                allowance_id: "${offer.allowance.id}",
                is_invoice_allowance: ${offer.isInvoiceAllowance ? "true" : "false"},
                offer_conditions: [${offer.offerConditions.reduce((result: string[], condition: PriceCondition): string[] => [...result, `"${condition.id}"`], []).join(`,`)}]
            }`
        });

        this.variables = null;
        this.query = gql`
            mutation InsertAllowances {
                insert: transport_allowance_offer_insert(objects: [${allowanceOfferObjects.join(",")}]) {
                    items: returning {
                        id
                    }
                }
            }
        `
    }
}