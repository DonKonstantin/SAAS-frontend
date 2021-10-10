import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса
export interface NullableTerminalResponse {
    data: {id: string}[]
}

// Запрос поиска нулевых терминалов
export class NullableTerminalLoaderQuery implements GraphQLQuery<{id: string[]}> {
    readonly query: any;
    readonly variables: { id: string[] };

    constructor(ids: string[]) {
        this.variables = {id: ids};
        this.query = gql`
            query($id:[ID]) {
              data: transport_terminal_list(where: {location_id:{_in:$id}, symbol_code: {_equals:"NULLABLE"}}) {
                id
              }
            }
        `
    }
}