import {GraphQLClient, GraphQLQuery} from "./GraphQLClient";
import {Collection} from "../types";
import {FetchResult} from "@apollo/client";
import {Subject} from "rxjs";
import {getAuthorizationToken} from "../../context/AuthorizationContext";

/**
 * Реализация серверного клиента GraphQL
 */
export class MainClient implements GraphQLClient {
    private readonly client: GraphQLClient;

    /**
     * Конструктор клиента
     *
     * @param client
     */
    constructor(
        client: GraphQLClient,
    ) {
        this.client = client;
    }

    async Query<V, Response>(query: GraphQLQuery<V>, headers: Collection<string>): Promise<Response> {
        headers = await this.getHeaders(headers);
        return await this.client.Query<V, Response>(query, headers);
    }

    async Mutation<V, Response>(query: GraphQLQuery<V>, headers: Collection<string>): Promise<Response> {
        headers = await this.getHeaders(headers);
        return await this.client.Mutation<V, Response>(query, headers);
    }

    Subscribe<V, Response>(query: GraphQLQuery<V>): Subject<FetchResult<Response>> {
        return this.client.Subscribe<V, Response>(query);
    }

    /**
     * Генерация базовых заголовков для запроса
     *
     * @param baseHeaders
     */
    private async getHeaders(baseHeaders: Collection<string>): Promise<Collection<string>> {
        let token: string = getAuthorizationToken();

        if (!token || 0 === token.length) {
            return {...baseHeaders}
        }

        return {
            ...baseHeaders,
            Authorization: token,
        };
    }
}
