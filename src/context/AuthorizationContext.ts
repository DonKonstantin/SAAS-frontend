import {BehaviorSubject, OperatorFunction, Subject, throttleTime} from "rxjs";
import {UserInfoData} from "../services/authService/UserInfoQuery";
import withBehaviourSubject from "../connectors/withBehaviourSubject";
import {authService} from "../services/authService";
import {loggerFactory} from "../services/logger";
import {notificationsDispatcher} from "../services/notifications";
import getConfig from "next/config";
import {clientServerDetector} from "../services/clientServerDetector";
import React from "react";
import i18n from "i18next";

// Контекст шагов импорта
export type AuthorizationContext = {
    authToken: string                   // Токен авторизации в системе
    userInfo: UserInfoData | undefined  // Профиль пользователя
    isRequestInProgress: boolean        // Флаг загрузки данных по запросу авторизации/восстановления пароля

    domain: string  // Выбранный пользователем домен
    project: string // Выбранный пользователем проект
};

// События, происходящие с контекстом
type AuthorizationActions = {
    // Выполнение запроса авторизации пользователя
    onAuthorize: { (email: string, password: string): Promise<boolean> }

    // Обработка запроса сброса пароля
    onResetPassword: { (email: string): Promise<void> }

    // Выполнение установки нового пароля по токену сброса пароля
    onChangePasswordByResetToken: { (token: string, newPassword: string): Promise<void> }

    // Получение токена авторизации
    getAuthorizationToken: { (): string }

    // Обработка разлогинивания пользователя
    onLogout: { (): void }

    // Первоначальная инициализация данных контекста
    initializeContextData: { (token: string): Promise<void> }

    // Получение текущего состояния контекста
    getCurrentState: { (): AuthorizationContext }

    // Установка текущего состояния контекста
    setCurrentState: { (state: AuthorizationContext): void }

    // Инициализация шины контекста
    initializeContextBus: { (): { (): void } }

    // Установка текущего домена пользователя
    setDomain: {(domain: string): void}

    // Установка текущего проекта пользователя
    setProject: {(project: string): void}
};

// Свойства контекста по умолчанию
class DefaultContext implements AuthorizationContext {
    authToken: string = "";
    domain: string = "";
    isRequestInProgress: boolean = false;
    project: string = "";
    userInfo: UserInfoData | undefined;
}

// Создаем изначальный State
const context$ = new BehaviorSubject<AuthorizationContext>(new DefaultContext);

// Контекст для обработки изменения токена
const tokenContext$ = new Subject<string>();

/**
 * Установка текущего домена пользователя
 * @param domain
 */
export const setDomain = (domain: string) => {
    context$.next({
        ...context$.getValue(),
        domain: domain,
    })
}

/**
 * Установка текущего проекта пользователя
 * @param project
 */
export const setProject = (project: string) => {
    context$.next({
        ...context$.getValue(),
        project: project,
    })
}

/**
 * Загрузка данных авторизации пользователя по переданному токену
 * @param token
 */
const loadAuthorizationData = async (token: string): Promise<AuthorizationContext> => {
    const userProfile = await authService().GetUserInfo(token)

    const domains = userProfile.roles.filter(r => r.level === "domain")
    const projects = userProfile.roles.filter(r => r.level === "project")

    const domain = domains.length === 1 ? domains[0].id : ""
    const project = domain.length === 0 && projects.length === 1 ? projects[0].id : ""

    return {
        ...new DefaultContext(),
        authToken: token,
        userInfo: userProfile,
        domain: domain,
        project: project,
    }
}

/**
 * Первоначальная инициализация данных контекста
 * @param token
 */
export const initializeContextData = async (token: string) => {
    context$.next({
        ...await loadAuthorizationData(token),
    })
};

/**
 * Получение текущего состояния контекста
 */
export const getCurrentState = () => {
    return context$.getValue()
};

/**
 * Установка текущего состояния контекста
 * @param state
 */
export const setCurrentState = (state: AuthorizationContext) => {
    context$.next({
        ...state,
    })
}

/**
 * Инициализация шины контекста
 */
const initializeContextBus = () => {
    const {publicRuntimeConfig} = getConfig();

    const log = loggerFactory().make(`Authorization`)
    const tokenUpd = tokenContext$.pipe(throttleTime(1000)).subscribe({
        next: async token => {
            if (0 === token.length) {
                context$.next({
                    ...context$.getValue(),
                    authToken: token,
                    userInfo: undefined,
                })

                return
            }

            try {
                const userProfile = await authService().GetUserInfo(token)

                context$.next({
                    ...context$.getValue(),
                    authToken: token,
                    userInfo: userProfile,
                })
            } catch (e) {
                log.Error(`Failed to load user profile`)

                notificationsDispatcher().dispatch({
                    message: i18n.t(`UI.auth-context.load-profile.error`),
                    type: "warning"
                })
            }
        },
    })

    // Сохраняем изменения токена в Cookie
    const tokenCookieSet = tokenContext$.pipe(throttleTime(1000)).subscribe({
        next: token => {
            if (clientServerDetector().isServer()) {
                return
            }

            document.cookie = `token=${token}; path=/;`
        }
    })

    // Запускаем обновление токена
    const tokenRefreshInterval = setInterval(async () => {
        const token = context$.getValue().authToken
        if (0 === token.length) {
            return
        }

        const refreshedToken = await authService().RefreshToken()
        if (!refreshedToken) {
            return
        }

        tokenContext$.next(refreshedToken)
    }, publicRuntimeConfig.tokenRefreshTimeout * 1000)

    return () => {
        clearInterval(tokenRefreshInterval)

        tokenUpd.unsubscribe()
        tokenCookieSet.unsubscribe()
    }
};

/**
 * Выполнение установки нового пароля по токену сброса пароля
 * @param token
 * @param newPassword
 */
const onChangePasswordByResetToken = async (token: string, newPassword: string) => {
    context$.next({
        ...context$.getValue(),
        isRequestInProgress: true,
    })

    try {
        const authToken = await authService().ChangePasswordByResetToken(token, newPassword)
        if (0 === authToken.length) {
            throw new Error(`Failed to set user password`)
        }

        tokenContext$.next(authToken)

        notificationsDispatcher().dispatch({
            message: i18n.t(`UI.auth-context.change-password.success`),
            type: "success"
        })
    } catch (e) {
        notificationsDispatcher().dispatch({
            message: i18n.t(`UI.auth-context.change-password.error`),
            type: "warning"
        })
    }

    context$.next({
        ...context$.getValue(),
        isRequestInProgress: false,
    })
};

/**
 * Обработка запроса сброса пароля
 * @param email
 */
const onResetPassword = async (email: string) => {
    context$.next({
        ...context$.getValue(),
        isRequestInProgress: true,
    })

    try {
        await authService().ResetPassword(email)

        notificationsDispatcher().dispatch({
            message: i18n.t(`UI.auth-context.reset-password.success`),
            type: "success"
        })
    } catch (e) {
        notificationsDispatcher().dispatch({
            message: i18n.t(`UI.auth-context.reset-password.error`),
            type: "warning"
        })
    }

    context$.next({
        ...context$.getValue(),
        isRequestInProgress: false,
    })
};

/**
 * Обработка разлогинивания пользователя
 */
const onLogout = () => {
    tokenContext$.next("")
};

/**
 * Получение токена авторизации
 */
export const getAuthorizationToken = () => {
    return context$.getValue().authToken
};

/**
 * Выполнение запроса авторизации пользователя
 */
const onAuthorize = async (email: string, password: string): Promise<boolean> => {
    context$.next({
        ...context$.getValue(),
        isRequestInProgress: true,
    })

    try {
        const token = await authService().Authorize(email, password)
        if (!token) {
            context$.next({
                ...context$.getValue(),
                isRequestInProgress: false,
            })

            return false
        }

        tokenContext$.next(token)

        context$.next({
            ...context$.getValue(),
            isRequestInProgress: false,
        })

        return true
    } catch (e) {
        context$.next({
            ...context$.getValue(),
            isRequestInProgress: false,
        })

        return false
    }
};

// Экспортируем результирующий тип, описывающий текущий контекст
export type WithAuthorization<T> =
    T
    & AuthorizationContext
    & AuthorizationActions;

// Тип, описывающий текущий HOC компонент
type HocType = { <T>(Component: React.ComponentType<WithAuthorization<T>>): React.ComponentType<T> };

// HOC для работы с авторизацией
const AuthorizationHoc = (...pipeModifications: OperatorFunction<any, AuthorizationContext>[]) => withBehaviourSubject(
    context$,
    {
        getAuthorizationToken,
        onAuthorize,
        onLogout,
        onResetPassword,
        onChangePasswordByResetToken,
        getCurrentState,
        setCurrentState,
        initializeContextBus,
        initializeContextData,
        setDomain,
        setProject,
    },
    ...pipeModifications
) as HocType;

// Экспортируем HOC
export default AuthorizationHoc;