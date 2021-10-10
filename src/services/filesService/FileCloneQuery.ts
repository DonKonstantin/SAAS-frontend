import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {FileData} from "./interface";

// Результат выполнения запроса клонирования файла
export interface FileCloneResponse {
    file_copy: FileData
}

// Параметры запроса
export interface FileCloneVars {
    fileId: string
}

// Запрос клонирования файла
export class FileCloneQuery implements GraphQLQuery<FileCloneVars> {
    readonly query: any;
    readonly variables: FileCloneVars;

    constructor(vars: FileCloneVars) {
        this.variables = vars;
        this.query = gql`
            mutation($fileId: ID!) {
              file_copy(id: $fileId) {
                created_at
                id
                mime_type
                name
                name_original
                size
              }
            }
        `;
    }
}