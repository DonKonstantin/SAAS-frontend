import gql from "graphql-tag";
import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";

// Запрос возобновления задания импорта
export class ResumeTaskQuery implements GraphQLQuery<{id: string}>{
    readonly query: any;
    readonly variables: { id: string };

    constructor(vars: { id: string }) {
        this.variables = vars;
        this.query = gql`
            mutation($id:ID!) {
              resumeImportTask(task:$id)
            }
        `;
    }
}