import gql from "graphql-tag";
import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";

// Запрос получение заданий импорта по ID
export class ShoulderImportTaskGetterSubscribeQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: {id: string};

    constructor(id: string) {
        this.variables = {id};
        this.query = gql`
            subscription($id:ID) {
              import_task: ImportTaskChanges(entityId:[$id], eventType:[updated]) {
                eventType
                entityId
                data {
                  id
                  processed_objects_quantity
                  status
                  total_objects_quantity
                }
              }
            }
        `;
    }
}