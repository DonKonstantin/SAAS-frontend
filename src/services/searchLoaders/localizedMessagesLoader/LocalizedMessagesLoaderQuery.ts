import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные терминала
export interface LocalizedMessagesData {
    id: string
    lang_id: string
    message: string
}

export interface LocalizedMessagesLoaderQueryResponse {
    items: LocalizedMessagesData[]
}

/**
 * Запрос загрузки данных по терминалам
 */
export class LocalizedMessagesLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadTerminals {
                items: localized_message_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    lang_id
                    message
                }
            }
        `
    }
}