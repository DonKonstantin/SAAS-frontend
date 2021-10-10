import gql from "graphql-tag";
import {GraphQLQuery} from "../graphQLClient/GraphQLClient";

/**
 * Результат запроса обновления токена пользователя
 */
export interface RefreshTokenResult {
    refresh_token: {
        token: string
    }
}

/**
 * Запрос обновления токена пользователя
 */
export class RefreshTokenQuery implements GraphQLQuery<never> {
    readonly query: any;
    readonly variables: never;

    constructor() {
        this.query = gql`
            query RefreshToken {
                refresh_token {
                    token
                }
            }
        `
    }
}