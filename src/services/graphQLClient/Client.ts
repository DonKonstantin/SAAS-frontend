import {GraphQLClient, GraphQLQuery} from "./GraphQLClient";
import {Collection} from "../types";
import {Logger, LoggerFactory} from "../logger/Logger";
import {ApolloClient, FetchResult, NormalizedCacheObject} from "@apollo/client";
import {Subject} from "rxjs";

// Данные для управления клиентом
type ClientData = {(): {
    client: ApolloClient<NormalizedCacheObject>,
    onClear: {(client: ApolloClient<NormalizedCacheObject>): Promise<void>},
}}

/**
 * Реализация клиента GraphQL сервера на основе Apollo
 */
export class Client implements GraphQLClient {

    private readonly defaultHeaders: Collection<string>;
    private readonly client: ClientData;
    private readonly logger: Logger;

    /**
     * Конструктор клиента
     *
     * @param loggerFactory
     * @param client
     * @param defaultHeaders
     */
    constructor(
        loggerFactory: LoggerFactory,
        client: ClientData,
        defaultHeaders: Collection<string> = {},
    ) {
        this.logger = loggerFactory.make("GraphQLClient");
        this.client = client;
        this.defaultHeaders = defaultHeaders;
    }

    /**
     * Выполнение запроса к серверу
     *
     * @param query
     * @param headers
     * @param currentTry
     */
    async Query<V, Response>(query: GraphQLQuery<V>, headers: Collection<string>, currentTry?: number): Promise<Response> {
        if (!currentTry) {
            currentTry = 1
        }

        const {client, onClear} = this.client();
        try {
            const response = await client.query<Response, V>({
                query: query.query,
                variables: query.variables,
                context: {
                    headers: {
                        ...this.defaultHeaders,
                        ...headers,
                    }
                }
            });

            await onClear(client);

            if (response.errors !== undefined) {
                const [firstError] = response.errors ;
                if (firstError.message.length === 0 ) {
                    throw new Error("GraphQL request failed");
                }

                throw new Error(response.errors.map(value => value.message).join(";"));
            }

            return response.data;
        } catch (e) {
            this.logger.Error("Request failed", e);

            /**
             * Проверка на не корректный токен
             */
            if (`${e}`.indexOf(`incorrect token`) > -1) {
                throw new Error(`${e}`);
            }

            if (`${e}`.indexOf(`GraphQL`) === -1 && `${e}`.indexOf(`status code 400`) === -1 && currentTry < 5) {
                return await this.Query(query, headers, ++currentTry)
            }

            throw new Error(`${e}`)
        }
    }

    /**
     * Выполнение запроса обновления к серверу
     *
     * @param query
     * @param headers
     */
    async Mutation<V, Response>(query: GraphQLQuery<V>, headers: Collection<string>): Promise<Response> {
        const {client, onClear} = this.client();
        try {
            const response = await client.mutate<Response, V>({
                mutation: query.query,
                variables: query.variables,
                context: {
                    headers: {
                        ...this.defaultHeaders,
                        ...headers,
                    }
                }
            });

            await onClear(client);

            if (response.errors !== undefined) {
                this.logger.Error("Request failed", query, response.errors);
                throw new Error("GraphQL request failed");
            }

            if (!response.data) {
                throw new Error("Undefined data returns by GraphQL request")
            }

            return response.data;
        } catch (e) {
            this.logger.Error("Request failed", e);
            throw new Error(`${e}`)
        }
    }

    /**
     * Выполняет запрос подписки на события, возникающие на сервере
     *
     * @param query
     */
    Subscribe<V, Response>(query: GraphQLQuery<V>): Subject<FetchResult<Response>> {
        const {client, onClear} = this.client();
        try {
            const subject = new Subject<FetchResult<Response>>();
            const subscription = client.subscribe<Response>({
                fetchPolicy: "network-only",
                query: query.query,
                // @ts-ignore
                variables: query.variables,
            });

            subscription.subscribe(value => subject.next(value));
            subject.subscribe({
                error: async err => {
                    await onClear(client);
                    this.logger.Error(`Closed subscription`, err);
                },
                complete: async () => {
                    await onClear(client);
                    this.logger.Debug(`Closed subscription`);
                }
            });

            return subject;
        } catch (e) {
            this.logger.Error("Request failed", e);
            throw new Error(`${e}`)
        }
    }
}
