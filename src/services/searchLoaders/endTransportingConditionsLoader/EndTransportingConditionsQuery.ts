import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export interface EndTransportingCondition {
    id: string
    default_name: string
    code: string
}

export interface EndTransportingConditionsQueryResponse {
    items: EndTransportingCondition[]
}

/**
 * Запрос загрузки данных по условиям окончания перевозки
 */
export class EndTransportingConditionsQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadDeliveryModes {
                items: transport_stop_transporting_condition_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                    code
                }
            }
        `
    }
}