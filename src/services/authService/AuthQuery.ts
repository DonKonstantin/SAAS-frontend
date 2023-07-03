import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат ответа на запрос авторизации
export interface AuthResponse {
    authorize: {
        token: string
    }
}

/**
 * Параметры запроса авторизации
 */
export class AuthParameters {
    email: string
    password: string
}

/**
 * Класс запроса авторизации пользователя
 */
export class AuthQuery implements GraphQLQuery<AuthParameters> {
    readonly query: any;
    readonly variables: AuthParameters;

    constructor(email: string, password: string) {
        this.query = gql`
            mutation Auth($email: String!, $password: String!) {
                authorize(email: $email, password: $password) {
                    token
                }
            }
        `

        this.variables = new AuthParameters()
        this.variables.email = email
        this.variables.password = password
    }
}