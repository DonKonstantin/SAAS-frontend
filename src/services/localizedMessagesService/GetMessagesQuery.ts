import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {LocalizedMessage} from "./interfaces";

/**
 * Результат выполнения запроса листинга локализованных сообщений
 */
export class GetMessagesQueryResponse {
    messages: LocalizedMessage[]
}

/**
 * Запрос получения листинга локализованных сообщений
 */
export class GetMessagesQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    /**
     * Конструктор запроса
     * @param ids
     */
    constructor(ids: string[]) {
        const query = `query __LOAD_MESSAGES__ {messages: localized_message_list(where:{id: {_in: [${ids.join(",")}]}}, limit:1000000){id, lang_id, message}}`

        this.query = gql`${query}`
        this.variables = null
    }
}