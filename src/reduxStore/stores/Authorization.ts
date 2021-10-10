// Интерфейс хранилища пользовательских данных
export interface UserData {
    id: string              // ID текущего пользователя
    email: string           // E-mail текущего пользователя.
    first_name: string      // Имя пользователя
    last_name: string       // Фамилия пользователя
    roles: string[]         // Массив ролей пользователя
    permissions: string[]   // Массив разрешений пользователя
}

// Интерфейс хранилища данных авторизации
export interface Authorization {
    token: string;      // Авторизационный токен пользователя.
    user: UserData;     // Данные пользователя.
}

// Интерфейс типов событий для данного хранилища
export interface AuthorizationActionTypes {
    AUTHORIZATION_LOGGED_IN: string
    AUTHORIZATION_STORE_AUTHORISATION: Authorization
    AUTHORIZATION_RESET: undefined
    AUTHORIZATION_RESET_STORE: undefined
}
