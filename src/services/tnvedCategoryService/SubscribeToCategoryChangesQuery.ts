import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedCategory} from "./interface";

// Результат выполнения запроса
export type SubscribeToCategoryChangesQueryResponse = {
    TnvedCompanyCategoryChanges: {
        entityId: string
        eventType: "created" | "updated" | "deleted"
        data: TnvedCategory
    }
};

// Запрос подписки на изменения категорий ТНВЭД
export class SubscribeToCategoryChangesQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            subscription {
              TnvedCompanyCategoryChanges {
                eventType
                data {
                  id
                  code
                  company_id
                  name
                }
              }
            }
        `;
    }
}