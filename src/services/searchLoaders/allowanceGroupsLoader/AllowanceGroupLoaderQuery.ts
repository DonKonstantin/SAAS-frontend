import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные группы надбавок
export interface AllowanceGroupData {
    id: string
    default_name: string
    code: string
}

export interface AllowanceGroupLoaderQueryResponse {
    items: AllowanceGroupData[]
}

/**
 * Запрос загрузки данных по группам надбавок
 */
export class AllowanceGroupLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null
        this.query = gql`
            query LoadTaxes {
                items: transport_allowance_group_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    default_name
                    code
                    id
                }
            }
        `
    }
}