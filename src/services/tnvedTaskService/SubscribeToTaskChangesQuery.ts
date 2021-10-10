import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedImportTask} from "./interface";

// Результат выполнения запроса
export interface SubscribeToTaskChangesQueryResponse {
    task: {
        entityId: string
        eventType: "created" | "updated" | "deleted"
        data: TnvedImportTask
    }
}

// Запрос подписки на события изменения заданий импорта товаров ТНВЭД
export class SubscribeToTaskChangesQuery implements GraphQLQuery<{ id: string }> {
    readonly query: any;
    readonly variables: { id: string };

    constructor(taskId: string) {
        this.variables = {id: taskId};
        this.query = gql`
            subscription($id:ID) {
              task: ImportTaskChanges(entityId:[$id]) {
                entityId
                eventType
                data {
                  id
                  processed_objects_quantity
                  status
                  total_objects_quantity
                }
              }
            }
        `
    }
}