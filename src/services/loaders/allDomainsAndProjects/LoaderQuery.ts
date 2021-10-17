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
export class LoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            query LoadDomainsAndCategories {
              domains: domain_list(limit: 100000) {
                id
                name
                active
              }
              projects: project_list(limit: 100000) {
                id
                name
                active
                parent
              }
            }
        `
    }
}