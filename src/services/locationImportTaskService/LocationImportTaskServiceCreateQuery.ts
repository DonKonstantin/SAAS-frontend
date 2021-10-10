import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {LocationToImport} from "../locationsParsingService/types";
import gql from "graphql-tag";

// Результат выполнения запроса на создание задания на импорт
export interface LocationImportTaskServiceCreateQueryResponse {
    task: {
        id: string
    }
}

// Запрос создания задания на импорт локаций
export class LocationImportTaskServiceCreateQuery implements GraphQLQuery<{locations: LocationToImport[]}> {
    readonly query: any;
    readonly variables: {locations: LocationToImport[]};

    constructor(locations: LocationToImport[]) {
        this.variables = {locations};
        this.query = gql`
            mutation($locations:[Location_To_Import_Complete_Data!]!) {
              task: createImportLocationsTask(locations: $locations) {
                id
              }
            }
        `;
    }
}