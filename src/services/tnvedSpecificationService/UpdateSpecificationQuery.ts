import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {TnvedSpecification} from "./interface";
import gql from "graphql-tag";

// Запрос обновления спецификации
export class UpdateSpecificationQuery implements GraphQLQuery<{ id: string }> {
    readonly query: any;
    readonly variables: { id: string; };

    constructor(specification: TnvedSpecification) {
        const updSpec = {
            base_specification_file_id: specification.base_specification_file_id
                ? `${specification.base_specification_file_id}`
                : `"null"`
            ,
            detail_specification_file_id: specification.detail_specification_file_id
                ? `${specification.detail_specification_file_id}`
                : `"null"`
            ,
        };

        this.variables = {id: specification.id};
        this.query = gql`
            mutation($id:ID!) {
              tnved_company_specification_update(set: {
                base_specification_file_id: ${updSpec.base_specification_file_id},
                detail_specification_file_id: ${updSpec.detail_specification_file_id},
              }, where:{id:{_equals:$id}}) {
                affected_rows
              }
            }
        `;
    };

}