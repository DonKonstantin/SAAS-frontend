import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные терминала
export interface TransportTypesData {
    id: string
    default_name: string
}

export interface TransportTypesLoaderQueryResponse {
    items: TransportTypesData[]
}

/**
 * Запрос загрузки данных по терминалам
 */
export class TransportTypesLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadTransportTypes {
                items: transport_type_list(
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