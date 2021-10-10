import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Запрос удаления файлов
export class DeleteFileQuery implements GraphQLQuery<{ fileId: string}>{
    readonly query: any;
    readonly variables: { fileId: string };

    constructor(fileId: string) {
        this.variables = {fileId};
        this.query = gql`
            mutation($fileId:ID!) {
              excel_file_delete(where:{id:{_equals:$fileId}}) {
                affected_rows
              }
            }
        `;
    }
}