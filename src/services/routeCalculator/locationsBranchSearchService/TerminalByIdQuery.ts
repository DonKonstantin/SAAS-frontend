import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Результат выполнения запроса
 */
export interface TerminalByIdQueryResult {
    transport_terminal_list: {
        id: string;
        default_name: string;
        location_id: string;
        symbol_code: string;
        localized_names: string[];
    }[]
}

/**
 * Запрос получения терминала по переданному ID
 */
export class TerminalByIdQuery implements GraphQLQuery<{ id: string[] }> {
    readonly query: any;
    readonly variables: { id: string[] };

    constructor(terminalIds: string[]) {
        this.variables = {id: terminalIds};
        this.query = gql`
            query SearchTerminal($id:[ID]) {
              transport_terminal_list(where:{id:{_in: $id}}) {
                id
                default_name
                location_id
                symbol_code
                localized_names
              }
            }
        `
    }
}
