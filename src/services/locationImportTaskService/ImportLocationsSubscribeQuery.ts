import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {ImportLocation} from "./interface";
import gql from "graphql-tag";

// Результат выполнения запроса
export interface ImportLocationsSubscribeQueryResponse {
    location: {
        entityId: string
        eventType: "updated"
        data: ImportLocation
    }
}

// Запрос подписки на изменения локаций импорта
export class ImportLocationsSubscribeQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            subscription {
              location: LocationToImportChanges(eventType:[updated]) {
                eventType
                entityId
                data {
                  default_name
                  error
                  import_id
                  import_task_id
                  is_processed
                  symbol_code
                }
              }
            }
        `
    }
}