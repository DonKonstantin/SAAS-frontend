import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export interface StartTransportingCondition {
    id: string
    default_name: string
    code: string
    is_prekeridge_available: boolean
}

export interface StartTransportingConditionsQueryResponse {
    items: StartTransportingCondition[]
}

/**
 * Запрос загрузки данных по условиям начала перевозки
 */
export class StartTransportingConditionsQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadDeliveryModes {
                items: transport_start_transporting_condition_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                    code
                    is_prekeridge_available
                }
            }
        `
    }
}