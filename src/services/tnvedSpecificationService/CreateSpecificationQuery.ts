import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса
export type CreateSpecificationQueryResponse = {
    tnved_company_specification_insert: {
        returning: {id: string}[]
    },
};

// Запрос создания спецификации по переданным параметрам
export class CreateSpecificationQuery implements GraphQLQuery<{companyId: number, baseDataFile: number}> {
    readonly query: any;
    readonly variables: { companyId: number; baseDataFile: number };

    constructor(companyId: number, baseDataFile: number) {
        this.variables = {companyId, baseDataFile};
        this.query = gql`
            mutation($companyId: Int!, $baseDataFile: Int!) {
              tnved_company_specification_insert(objects:[{
                base_data_file_id:$baseDataFile,
                company_id:$companyId,
              }]) {
                returning {
                  id
                }
              }
            }
        `;
    }
}