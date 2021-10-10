import {AuthServiceInterface} from "./interfaces";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {AuthParameters, AuthQuery, AuthResponse} from "./AuthQuery";
import {UserInfoData, UserInfoQuery, UserInfoResponse} from "./UserInfoQuery";
import {RefreshTokenQuery, RefreshTokenResult} from "./RefreshTokenQuery";
import {Collection} from "../types";

/**
 * Сервис авторизации пользователя
 */
export class AuthService implements AuthServiceInterface {

    // Клиент GraphQL API
    private readonly client: () => GraphQLClient

    /**
     * Конструктор сервиса
     * @param client
     */
    constructor(client: () => GraphQLClient) {
        this.client = client
    }

    /**
     * Авторизация пользователя по логину и паролю
     *
     * @param email
     * @param password
     */
    async Authorize(email: string, password: string): Promise<string | null> {
        try {
            let response = await this.client().Mutation<AuthParameters, AuthResponse>(
                new AuthQuery(email, password),
                {}
            )

            return response.authorize.token
        } catch (e) {
            return null;
        }
    }

    /**
     * Получение информации о пользователе
     *
     * @param token
     */
    async GetUserInfo(token?: string): Promise<UserInfoData | undefined> {
        try {
            let headers: Collection<string> = {}
            if (undefined !== token) {
                headers = {
                    Authorization: token
                }
            }

            let response = await this.client().Query<never, UserInfoResponse>(new UserInfoQuery(), headers)

            return response.user_info
        } catch (e) {
            return undefined
        }
    }

    /**
     * Получение информации о пользователе
     */
    async RefreshToken(): Promise<string | undefined> {
        try {
            let response = await this.client().Query<never, RefreshTokenResult>(
                new RefreshTokenQuery(),
                {}
            )

            return response.refresh_token.token
        } catch (e) {
            return undefined
        }
    }
}