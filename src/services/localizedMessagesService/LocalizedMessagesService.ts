import {LocalizedDictionary, LocalizedMessage, LocalizedMessagesServiceInterfaces} from "./interfaces";
import {Collection} from "../types";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {loggerFactory} from "../logger";
import {graphQLClient} from "../graphQLClient";
import {GetMessagesQuery, GetMessagesQueryResponse} from "./GetMessagesQuery";
import {InsertMessagesMutation, InsertMessagesMutationResponse} from "./InsertMessagesMutation";
import {UpdateMessageMutation, UpdateMessageMutationResponse} from "./UpdateMessageMutation";

/**
 * Сервис работы с локализованными сообщениями
 */
export class LocalizedMessagesService implements LocalizedMessagesServiceInterfaces {
    private readonly client: GraphQLClient
    private readonly logger = loggerFactory().make(`LocalizedMessagesService`)

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    /**
     * Получение листинга локализованных сообщений по ID.
     * В результатах возвращает картированный результат с ключем - langID.
     * @param ids
     */
    async GetMessages(ids: string[]): Promise<Collection<LocalizedMessage>> {
        try {
            if (0 === ids.length) {
                return {}
            }

            const response = await this.client.Query<null, GetMessagesQueryResponse>(new GetMessagesQuery(ids), {})
            this.logger.Debug(`Loaded base data`, response)

            if (response.messages.length === 0) {
                return {}
            }

            const result = response.messages.reduce((result: Collection<LocalizedMessage>, message: LocalizedMessage): Collection<LocalizedMessage> => {
                return {
                    ...result,
                    [message.lang_id]: message,
                }
            }, {})
            this.logger.Debug(`Parsed loaded data`, result)

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
            return {}
        }
    }

    /**
     * Получение листинга словаря для нескольких фраз по их ID
     * @param ids
     */
    async GetDictionaryMessages(ids: string[]): Promise<LocalizedDictionary> {
        try {
            if (0 === ids.length) {
                return {}
            }

            const response = await this.client.Query<null, GetMessagesQueryResponse>(new GetMessagesQuery(ids), {})
            this.logger.Debug(`Loaded base data`, response)

            if (response.messages.length === 0) {
                return {}
            }

            const result = response.messages.reduce((result: LocalizedDictionary, message: LocalizedMessage): LocalizedDictionary => {
                const existDict = result[message.lang_id] || {};
                return {
                    ...result,
                    [message.lang_id]: {
                        ...existDict,
                        [message.id]: message
                    },
                }
            }, {})
            this.logger.Debug(`Parsed loaded data`, result)

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
            return {}
        }
    }



    /**
     * Сохраняет сообщения и возвращает результат.
     * Если сообщение было создано - для него присваивается ID.
     * @param messages
     */
    async StoreMessages(messages: Collection<LocalizedMessage>): Promise<Collection<LocalizedMessage>> {
        try {
            let messagesToUpdate: LocalizedMessage[] = []
            let messagesToCreate: LocalizedMessage[] = []

            Object.values(messages).map(message => {
                if (!message.id || 0 === message.id.length) {
                    messagesToCreate.push(message)
                } else {
                    messagesToUpdate.push(message)
                }
            })

            let result: Collection<LocalizedMessage> = {}
            const createPromise = this.CreateMessages(messagesToCreate).then(messages => {
                result = {...result, ...messages}
            })
            await Promise.all([createPromise, ...messagesToUpdate.map(async message => {
                const updMessage = await this.UpdateMessage(message)
                if (!updMessage) {
                    return
                }

                result[updMessage.lang_id] = message
            })])

            this.logger.Debug(`Store result`, result)

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
            return {}
        }
    }

    /**
     * Создание новых сообщений
     * @param messagesToCreate
     */
    async CreateMessages(messagesToCreate: LocalizedMessage[]): Promise<Collection<LocalizedMessage>> {
        if (0 === messagesToCreate.length) {
            return {}
        }

        const response = await this.client.Mutation<null, InsertMessagesMutationResponse>(new InsertMessagesMutation(messagesToCreate), {})
        this.logger.Debug(`Message creation response`, response)
        if (0 === response.messages.returning.length) {
            return {}
        }

        return await this.GetMessages(response.messages.returning.map(item => item.id))
    }

    /**
     * Обновление локализованного сообщения
     * @param messageToUpdate
     */
    async UpdateMessage(messageToUpdate: LocalizedMessage): Promise<LocalizedMessage | undefined> {
        const response = await this.client.Mutation<null, UpdateMessageMutationResponse>(new UpdateMessageMutation(messageToUpdate), {})
        this.logger.Debug(`Message update response`, response)
        if (0 === response.messages.returning.length) {
            return undefined
        }

        return {
            ...messageToUpdate,
            id: response.messages.returning[0].id,
        }
    }
}
