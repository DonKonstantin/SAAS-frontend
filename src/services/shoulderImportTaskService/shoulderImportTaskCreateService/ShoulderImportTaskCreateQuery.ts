import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import {Shoulder} from "../shoulderTypes";
import gql from "graphql-tag";

// Переменные для выполнения запроса
export type Vars = {
    shoulders: Shoulder[]
};

// Результат выполнения запроса создания задания
export type ShoulderImportTaskCreateQueryResponse = {
    result: {
        id: string
    }
};

// Запрос создания задания на импорт ставок
export class ShoulderImportTaskCreateQuery implements GraphQLQuery<Vars> {
    readonly query: any;
    readonly variables: Vars;

    constructor(shoulders: Shoulder[]) {
        this.variables = {
            shoulders: shoulders,
        };

        this.query = gql`
            mutation($shoulders: [Transport_Import_Shoulder_Complete_Data!]!) {
              result: createImportShouldersTask(shoulders: $shoulders) {
                id
              }
            }
        `;
    }
}