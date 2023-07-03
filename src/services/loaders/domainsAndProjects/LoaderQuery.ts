import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные домена
export interface DomainData {
    id: string
    name: string
    active: boolean
}

// Данные проекта
export interface ProjectData {
    id: string
    name: string
    active: boolean
    parent: number
}

// Результат выполнения запроса
export interface LoaderQueryResponse {
    domains: DomainData[]
    projects: ProjectData[]
}

/**
 * Запрос загрузки данных по доменам и проектам
 */
export class LoaderQuery implements GraphQLQuery<{ID: any[], count: number}> {
    readonly query: any;
    readonly variables: {ID: any[], count: number};

    constructor(ids: any[]) {
        this.variables = {
            ID: ids,
            count: ids.length
        };
        this.query = gql`
            query LoadDomainsAndCategories($ID:[ID!]!, $count: Int!) {
              domains: domain_list(where:{id:{_in:$ID}}, limit: $count) {
                id
                name
                active
              }
              projects: project_list(where:{id:{_in:$ID}}, limit: $count) {
                id
                name
                active
                parent
              }
            }
        `
    }
}