import {UserInfoData} from "./UserInfoQuery";

/**
 * Сервис авторизации пользователя
 */
export interface AuthServiceInterface {
    /**
     * Авторизация пользователя по логину и паролю
     * @param email
     * @param password
     */
    Authorize(email: string, password: string): Promise<string>

    /**
     * Получение информации о пользователе
     * @param token
     */
    GetUserInfo(token?: string): Promise<UserInfoData>

    /**
     * Получение информации о пользователе
     */
    RefreshToken(): Promise<string>

    /**
     * Запрос сброса пароля по переданному E-mail адресу
     * @param email
     */
    ResetPassword(email: string): Promise<void>

    /**
     * Сброс пароля по переданному токену восстановления
     * @param token
     * @param password
     */
    ChangePasswordByResetToken(token: string, password: string): Promise<string>
}