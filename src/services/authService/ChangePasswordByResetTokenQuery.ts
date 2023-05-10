import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса установки пароля
export type ChangePasswordByResetTokenQueryResponse = {
    result: {
        success: boolean
    }
};

/**
 * Запрос изменения пароля пользователя по переданному токену сброса пароля
 */
export class ChangePasswordByResetTokenQuery implements GraphQLQuery<{ token: string, password: string }> {
    readonly query: any;
    readonly variables: { token: string; password: string };

    constructor(token: string, password: string) {
        this.variables = {token, password}
        this.query = gql`
            mutation ChangeUserPasswordByResetToken($token: String!, $password: String!) {
              result: changePassword(token: $token, password: $password) {
                success
              }
            }
        `
    }
}