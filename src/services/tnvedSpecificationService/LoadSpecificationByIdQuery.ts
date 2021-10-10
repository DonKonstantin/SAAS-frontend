import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedSpecification} from "./interface";

// Результат выполнения запроса
export type LoadSpecificationByIdQueryResponse = {
    tnved_company_specification_list: TnvedSpecification[]
};

// Загрузка спецификации по переданному ID
export class LoadSpecificationByIdQuery implements GraphQLQuery<{specificationId: string}> {
    readonly query: any;
    readonly variables: { specificationId: string };

    constructor(specificationId: string) {
        this.variables = {specificationId: specificationId};
        this.query = gql`
            query($specificationId: ID!) {
              tnved_company_specification_list(where:{id:{_equals:$specificationId}}) {
                base_data_file_id
                base_specification_file_id
                company_id
                detail_specification_file_id
                id
              }
            }
        `;
    }
}