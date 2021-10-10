import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {LocationImportTask} from "./interface";

// Результат выполнения запроса на получение заданий импорта по ID
export interface LocationImportTaskServiceGetByIdQueryResponse {
    tasks: LocationImportTask[]
}

// Запрос получение заданий импорта по ID
export class LocationImportTaskServiceGetByIdQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: {id: string};

    constructor(id: string) {
        this.variables = {id};
        this.query = gql`
            query($id:ID) {
              tasks: location_import_task_list(where:{id:{_equals:$id}}) {
                id
                processed_objects_quantity
                status
                total_objects_quantity
              }
            }
        `;
    }
}