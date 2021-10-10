import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные подрядчика
export interface ContractorData {
    id: string
    default_name: string
}

export interface ContractorLoaderQueryResponse {
    items: ContractorData[]
}

/**
 * Запрос загрузки данных по перевозчикам
 */
export class ContractorLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadContractors {
                items: contractor_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                }
            }
        `
    }
}