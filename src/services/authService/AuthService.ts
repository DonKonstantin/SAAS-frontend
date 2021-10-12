import {AuthServiceInterface} from "./interfaces";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {AuthParameters, AuthQuery, AuthResponse} from "./AuthQuery";
import {UserInfoData, UserInfoQuery, UserInfoResponse} from "./UserInfoQuery";
import {RefreshTokenQuery, RefreshTokenResult} from "./RefreshTokenQuery";
import {Collection} from "../types";
import {ResetPasswordQuery} from "./ResetPasswordQuery";
import {
    ChangePasswordByResetTokenQuery,
    ChangePasswordByResetTokenQueryResponse
} from "./ChangePasswordByResetTokenQuery";

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
     * Сброс пароля по переданному токену восстановления
     * @param token
     * @param password
     */
    async ChangePasswordByResetToken(token: string, password: string): Promise<string> {
        let response = await this.client().Mutation<{ token: string, password: string }, ChangePasswordByResetTokenQueryResponse>(
            new ChangePasswordByResetTokenQuery(token, password),
            {}
        )

        return response.result.token
    }

    /**
     * Авторизация пользователя по логину и паролю
     *
     * @param email
     * @param password
     */
    async Authorize(email: string, password: string): Promise<string> {
        let response = await this.client().Mutation<AuthParameters, AuthResponse>(
            new AuthQuery(email, password),
            {}
        )

        return response.authorize.token
    }

    /**
     * Получение информации о пользователе
     *
     * @param token
     */
    async GetUserInfo(token?: string): Promise<UserInfoData> {
        let headers: Collection<string> = {}
        if (undefined !== token) {
            headers = {
                Authorization: token
            }
        }

        let response = await this.client().Query<never, UserInfoResponse>(new UserInfoQuery(), headers)

        return response.userInfo
    }

    /**
     * Получение информации о пользователе
     */
    async RefreshToken(): Promise<string> {
        let response = await this.client().Query<never, RefreshTokenResult>(
            new RefreshTokenQuery(),
            {}
        )

        return response.refreshToken.token
    }

    /**
     * Запрос сброса пароля по переданному E-mail адресу
     * @param email
     */
    async ResetPassword(email: string): Promise<void> {
        await this.client().Mutation<{ email: string }, void>(
            new ResetPasswordQuery(email),
            {}
        )
    }
}