import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные налога
export interface TaxData {
    id: string
    default_name: string
    is_default: boolean
    amount: number
    code: string
}

export interface TaxLoaderQueryResponse {
    items: TaxData[]
}

/**
 * Запрос загрузки данных по налогам
 */
export class TaxLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadTaxes {
                items: tax_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                    is_default
                    amount
                    code
                }
            }
        `
    }
}