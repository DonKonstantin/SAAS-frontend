import {UserInfoData} from "./UserInfoQuery";

/**
 * Сервис авторизации пользователя
 */
export interface AuthServiceInterface {
    /**
     * Авторизация пользователя по логину и паролю
     *
     * @param email
     * @param password
     */
    Authorize(email: string, password: string): Promise<string | null>

    /**
     * Получение информации о пользователе
     *
     * @param token
     */
    GetUserInfo(token?: string): Promise<UserInfoData | undefined>

    /**
     * Получение информации о пользователе
     */
    RefreshToken(): Promise<string | undefined>
}