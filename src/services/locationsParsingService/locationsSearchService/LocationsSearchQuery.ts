import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {Location} from "./interface";
import {LocationToImport} from "../types";

// Результат выполнения запроса поиска
export interface LocationsSearchQueryResponse {
    result: Location[]
}

/**
 * Запрос поиска локаций по переданным символьным кодам
 */
export class LocationsSearchQuery implements GraphQLQuery<{codes: string[]}> {
    readonly query: any;
    readonly variables: {codes: string[]};

    constructor(id: string[]) {
        this.variables = {codes: id};
        this.query = gql`
            query($codes:[ID]) {
              result: locations_list(where:{import_id:{_in:$codes}}, limit:1000) {
                id
                import_id
              }
            }
        `;
    }
}

// Результат выполнения запроса поиска целевых сущностей
export interface LocationsSearchByTargetFieldQueryResponse<T extends keyof LocationToImport> {
    result: ({id: string, default_name: string} & {[K in T]: string})[]
}

/**
 * Запрос поиска локаций по переданному полю
 */
export class LocationsSearchByTargetFieldQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(targetField: keyof LocationToImport, values: string[]) {
        this.variables = null;
        this.query = gql`
            query {
              result: locations_list(where:{${targetField}:{_in:[${values.map(v => `"${v}"`).join(",")}]}}, limit:${values.length}) {
                id
                default_name
                ${targetField}
              }
            }
        `;
    }
}