import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса создания задания импорта
export type TnvedTaskServiceCreateQueryResponse = {
    result: string
}

// Запрос создания нового задания импорта товаров ТНВЭД
export class TnvedTaskServiceCreateQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            mutation {
              result: createTnvedImportTask
            } 
        `
    }
}