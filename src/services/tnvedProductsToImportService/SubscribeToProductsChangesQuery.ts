import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedProductToImport} from "./interface";

// Результат выполнения запроса
export type SubscribeToProductsChangesQueryResponse = {
    TnvedCompanyProductToImportChanges: {
        entityId: string
        eventType: "created" | "updated" | "deleted"
        data: TnvedProductToImport
    }
};

// Запрос подписки на события изменения товаров ТНВЭД для импорта
export class SubscribeToProductsChangesQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            subscription {
              TnvedCompanyProductToImportChanges {
                entityId
                eventType
                data {
                  category_id
                  company_id
                  error
                  id
                  import_id
                  is_processed
                  name
                  sku
                  task_id
                  tnved_code
                }
              }
            }
        `
    }
}