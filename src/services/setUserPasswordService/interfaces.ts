/**
 * Сервис установки пароля пользователя
 */
export interface SetUserPasswordServiceInterface {
    /**
     * Установка пароля пользователя
     * @param userId
     * @param password
     */
    SetPassword(userId: string, password: string): Promise<void>

    /**
     * Создание пароля пользователя
     * @param userId
     * @param password
     */
    CreatePassword(userId: string, password: string): Promise<void>
}