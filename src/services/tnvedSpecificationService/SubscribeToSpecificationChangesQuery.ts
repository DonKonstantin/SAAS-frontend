import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedSpecification} from "./interface";

// Результат выполнения запроса
export type SubscribeToSpecificationChangesQueryResponse = {
    TnvedCompanySpecificationChanges: {
        entityId: string
        eventType: "created" | "updated" | "deleted"
        data: TnvedSpecification
    }
};

// Запрос подписки на изменения спецификации
export class SubscribeToSpecificationChangesQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: { id: string };

    constructor(id: string) {
        this.variables = {id};
        this.query = gql`
            subscription($id:ID!) {
              TnvedCompanySpecificationChanges(entityId: [$id]) {
                entityId
                eventType
                data {
                  base_data_file_id
                  base_specification_file_id
                  company_id
                  detail_specification_file_id
                  id
                }
              }
            }
        `;
    }
}