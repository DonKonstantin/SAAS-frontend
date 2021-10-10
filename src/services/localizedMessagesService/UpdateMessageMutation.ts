import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {LocalizedMessage} from "./interfaces";
import gql from "graphql-tag";

/**
 * Результат обновления локализованного сообщения
 */
export class UpdateMessageMutationResponse {
    messages: {
        returning: {id: string}[]
    }
}

/**
 * Мутация обновления локализованного сообщения
 */
export class UpdateMessageMutation implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    /**
     * Конструктор сервиса
     * @param message
     */
    constructor(message: LocalizedMessage) {
        const query = `mutation __UPDATE_MESSAGES__ {messages: localized_message_update(set: {message: "${message.message}", lang_id: ${message.lang_id}}, where: {id: {_equals: ${message.id}}}) {returning {id}}}`

        this.query = gql`${query}`
        this.variables = null
    }
}