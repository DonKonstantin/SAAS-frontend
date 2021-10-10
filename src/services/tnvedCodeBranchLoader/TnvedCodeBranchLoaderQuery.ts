import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedCode} from "./interface";

// Результат выполнения запроса
export type TnvedCodeBranchLoaderQueryResponse = {
    result: TnvedCode[]
};

/**
 * Запрос загрузки ветки кодов ТНВЭД по переданным ID
 */
export class TnvedCodeBranchLoaderQuery implements GraphQLQuery<{id: string[]}> {
    readonly query: any;
    readonly variables: { id: string[] };

    constructor(id: string[]) {
        this.variables = {id};
        this.query = gql`
            query($id:[ID]!) {
              result: getBranchesForTnvedCodes(codeIds: $id) {
                code
                created_at
                description
                id
                last_modified
                name
                parent
                path
                vendor
              }
            }
        `;
    }
}