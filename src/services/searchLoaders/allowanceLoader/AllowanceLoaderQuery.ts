import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные надбавки
export interface AllowanceData {
    id: string
    default_name: string
    allowance_group: string
    code: string
}

export interface AllowanceLoaderQueryResponse {
    items: AllowanceData[]
}

/**
 * Запрос загрузки данных по надбавкам
 */
export class AllowanceLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null
        this.query = gql`
            query LoadTaxes {
                items: transport_allowance_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    allowance_group
                    default_name
                    code
                    id
                }
            }
        `
    }
}