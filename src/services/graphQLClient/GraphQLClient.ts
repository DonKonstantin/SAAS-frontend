import {Collection} from "../types";
import {FetchResult} from "@apollo/client";
import {Subject} from "rxjs";

/**
 * Интерфейс GraphQL запроса
 */
export interface GraphQLQuery<Variables> {
    readonly query: any;
    readonly variables: Variables;
}

/**
 * Интерфейс GraphQL клиента
 */
export interface GraphQLClient {
    // Выполняет запрос к серверу и возвращает результат
    Query<V, Response>(query: GraphQLQuery<V>, headers: Collection<string>): Promise<Response>

    // Выполняет запрос изменения к серверу и возвращает результат
    Mutation<V, Response>(query: GraphQLQuery<V>, headers: Collection<string>): Promise<Response>

    // Выполняет запрос подписки на события, возникающие на сервере
    Subscribe<V, Response>(query: GraphQLQuery<V>): Subject<FetchResult<Response>>
}
