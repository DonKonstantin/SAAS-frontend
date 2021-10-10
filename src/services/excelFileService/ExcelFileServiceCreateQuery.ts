import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполения запроса создания файла
export type ExcelFileServiceCreateQueryResult = {
    result: {id: string}
};

// Запрос создания файла
export class ExcelFileServiceCreateQuery implements GraphQLQuery<{ data: any }> {
    readonly query: any;
    readonly variables: { data: any };

    constructor(name: string, companyId: number, data: string[][]) {
        const mappedData: { [T: number]: { [T: number]: string } } = {};
        data.map((row, i) => {
            const rowData: { [T: number]: string } = {};
            row.map((cell, j) => {
                rowData[j] = cell
            });

            mappedData[i] = rowData;
        });

        this.variables = {
            data: {
                company_id: companyId,
                data: JSON.stringify(mappedData),
                name: name
            }
        };

        this.query = gql`
            mutation($data:Excel_File_Data!) {
              result: createExcelFile(excelFile:$data) {
                id
              }
            }
        `;
    }
}