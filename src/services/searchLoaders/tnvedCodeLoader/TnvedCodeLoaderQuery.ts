import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные кода ТНВЭД
export interface TnvedCodeData {
    code: string
    created_at: string
    description: string
    id: string
    last_modified: string
    name: string
    parent: number | null
    path: string
    vendor: string
}

// Результат выполнения запроса
export interface TnvedCodeLoaderQueryResponse {
    items: TnvedCodeData[]
}

/**
 * Запрос загрузки данных по терминалам
 */
export class TnvedCodeLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query {
                items: tnved_code_list(
                    limit: 1000000
                    order: [{by: id}]
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    code
                    created_at
                    description
                    id
                    last_modified
                    name
                    parent
                    path
                    vendor
                }
            }
        `
    }
}