import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {ImportLocation} from "./interface";
import gql from "graphql-tag";

// Переменные загрузки страницы локаций для задания импорта
export interface ImportLocationsLoadQueryVariables {
    taskId: string
    offset: number
    limit: number
}

// Результат выполнения запроса
export interface ImportLocationsLoadQueryResponse {
    locations: ImportLocation[]
}

// Запрос загрузки страницы локаций для задания импорта
export class ImportLocationsLoadQuery implements GraphQLQuery<ImportLocationsLoadQueryVariables> {
    readonly query: any;
    readonly variables: ImportLocationsLoadQueryVariables;

    constructor(variables: ImportLocationsLoadQueryVariables) {
        this.variables = variables;
        this.query = gql`
            query($taskId:ID, $limit: Int!, $offset: Int!) {
              locations: location_to_import_list(
                where:{import_task_id: {_equals:$taskId}},
                limit: $limit,
                offset: $offset,
                order:[{by:import_id,direction:asc}],
              ){
                default_name
                error
                import_id
                import_task_id
                is_processed
                symbol_code
              }
            }
        `
    }
}