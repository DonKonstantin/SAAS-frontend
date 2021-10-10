import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса получения списка сущностей надбавок
export interface AllowanceOfferLoadQueryResponse {
    items: {
        id: string
        allowance_id: string
        is_invoice_allowance: boolean
        offer_conditions: string[]
    }[]
}

// Запрос получения списка сущностей надбавок
export class AllowanceOfferLoadQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadAllowances {
                items: transport_allowance_offer_list(where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}, order:[{by:id, direction:asc, priority: 2}]) {
                    id
                    allowance_id
                    is_invoice_allowance
                    offer_conditions
                }
            }
        `
    }
}