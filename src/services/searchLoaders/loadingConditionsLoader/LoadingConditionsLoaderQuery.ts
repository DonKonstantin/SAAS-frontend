import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные условий погрузки
export interface LoadingConditionsData {
    id: string
    code: string
    default_name: string
}

export interface LoadingConditionsLoaderQueryResponse {
    items: LoadingConditionsData[]
}

/**
 * Запрос загрузки данных по условиям погрузки
 */
export class LoadingConditionsLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadDeliveryModes {
                items: transport_loading_condition_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    code
                    default_name
                }
            }
        `
    }
}