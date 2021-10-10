import gql from "graphql-tag";
import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";

// Запрос приостановки задания импорта
export class PauseTaskQuery implements GraphQLQuery<{id: string}>{
    readonly query: any;
    readonly variables: { id: string };

    constructor(vars: { id: string }) {
        this.variables = vars;
        this.query = gql`
            mutation($id:ID!) {
              pauseImportTask(task:$id)
            }
        `;
    }
}