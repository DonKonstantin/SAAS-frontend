import gql from "graphql-tag";
import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";

// Запрос запуска задания импорта
export class RunTaskQuery implements GraphQLQuery<{id: string}>{
    readonly query: any;
    readonly variables: { id: string };

    constructor(vars: { id: string }) {
        this.variables = vars;
        this.query = gql`
            mutation($id:ID!) {
              runImportTask(task:$id)
            }
        `;
    }
}