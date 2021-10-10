import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {LocalizedMessage} from "./interfaces";
import gql from "graphql-tag";

/**
 * Результат вставки новых локализованных сообщений
 */
export class InsertMessagesMutationResponse {
    messages: {
        returning: {id: string}[]
    }
}

/**
 * Мутация вставки новых локализованных сообщений
 */
export class InsertMessagesMutation implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    /**
     * Конструктор сервиса
     * @param messages
     */
    constructor(messages: LocalizedMessage[]) {
        const objects = messages.map(message => `{message: "${message.message}", lang_id: ${message.lang_id}}`)
        const query = `mutation __INSERT_MESSAGES__ {messages: localized_message_insert(objects: [${objects.join(",")}]){returning {id}}}`

        this.query = gql`${query}`
        this.variables = null
    }
}