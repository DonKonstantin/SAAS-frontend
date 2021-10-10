import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные терминала
export interface TerminalsData {
    id: string
    default_name: string
    localized_names: string[]
    location_id: string
    symbol_code: string
}

export interface TerminalsLoaderQueryResponse {
    items: TerminalsData[]
}

/**
 * Запрос загрузки данных по терминалам
 */
export class TerminalsLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadTerminals {
                items: transport_terminal_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                    localized_names
                    location_id
                    symbol_code
                }
            }
        `
    }
}