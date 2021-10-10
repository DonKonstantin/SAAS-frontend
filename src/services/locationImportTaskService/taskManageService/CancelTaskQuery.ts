import gql from "graphql-tag";
import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";

// Запрос отмены задания импорта
export class CancelTaskQuery implements GraphQLQuery<{id: string}>{
    readonly query: any;
    readonly variables: { id: string };

    constructor(vars: { id: string }) {
        this.variables = vars;
        this.query = gql`
            mutation($id:ID!) {
              cancelImportTask(task:$id)
            }
        `;
    }
}