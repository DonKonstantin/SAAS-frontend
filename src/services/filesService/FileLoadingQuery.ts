import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {FileData} from "./interface";

// Результат выполнения запроса получения файлов
export interface FileLoadResponse {
    file_list: FileData[]
}

// Параметры запроса
export interface FileLoadVars {
    ids: string[]
}

// Запрос получения файлов
export class FileLoadQuery implements GraphQLQuery<FileLoadVars> {
    readonly query: any;
    readonly variables: FileLoadVars;

    constructor(vars: FileLoadVars) {
        this.variables = vars;
        this.query = gql`
            query($ids: [ID]) {
              file_list(where:{id:{_in:$ids}}) {
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