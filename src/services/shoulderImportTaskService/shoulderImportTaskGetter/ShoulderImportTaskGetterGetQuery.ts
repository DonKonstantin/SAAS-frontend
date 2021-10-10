import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {ShoulderImportTask} from "./interface";

// Результат выполнения запроса на получение заданий импорта по ID
export interface ShoulderImportTaskGetterGetQueryResponse {
    tasks: ShoulderImportTask[]
}

// Запрос на получение заданий импорта по ID
export class ShoulderImportTaskGetterGetQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: { id: string };

    constructor(id: string) {
        this.variables = {id};
        this.query = gql`
            query($id:ID) {
              tasks: shoulder_import_task_list(where:{id:{_equals:$id}}) {
                id
                processed_objects_quantity
                status
                total_objects_quantity
              }
            }
        `;
    }
}