import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {gql} from "@apollo/client/core";
import {TnvedImportTask} from "./interface";

// Результат выполнения запроса
export type LoadTaskByIdQueryResponse = {
    result: TnvedImportTask[]
};

// Запрос загрузки данных по задаче импорта товаров ТНВЭД
export class LoadTaskByIdQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: { id: string };

    constructor(taskId: string) {
        this.variables = {id: taskId};
        this.query = gql`
            query($id:ID!) {
              result: tnved_products_import_task_list(where:{id:{_equals:$id}}) {
                id
                status
                processed_objects_quantity
                total_objects_quantity
              }
            }
        `;
    }
}