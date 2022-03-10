import {
    BehaviorSubject,
    distinctUntilChanged,
    distinctUntilKeyChanged, map,
    OperatorFunction,
    Subject,
    throttleTime
} from "rxjs";
import {UserInfoData} from "../services/authService/UserInfoQuery";
import withBehaviourSubject from "../connectors/withBehaviourSubject";
import {authService} from "../services/authService";
import {loggerFactory} from "../services/logger";
import {notificationsDispatcher} from "../services/notifications";
import getConfig from "next/config";
import {clientServerDetector} from "../services/clientServerDetector";
import React, {useEffect, useState} from "react";
import i18n from "i18next";
import {allDomainsAndProjectsLoader} from "../services/loaders/allDomainsAndProjects";
import {DomainData, ProjectData} from "../services/loaders/allDomainsAndProjects/LoaderQuery";

// Контекст шагов импорта
export type AuthorizationContext = {
    authToken: string                   // Токен авторизации в системе
    userInfo: UserInfoData | undefined  // Профиль пользователя
    isRequestInProgress: boolean        // Флаг загрузки данных по запросу авторизации/восстановления пароля
    isNeedRedirectAfterAuth: boolean    // Необходимость выполнить редирект на основную сраницу для пользователя

    // Тип отображаемого в данный момент меню
    menuType: "realm" | "domain" | "project"

    domain: string  // Выбранный пользователем домен
    project: string // Выбранный пользователем проект

    domains: DomainData[]   // Все, доступные пользователю, домены
    projects: ProjectData[] // Все, доступные пользователю, проекты
};

enum levelEnum {
    "realm" = 1,
    "domain" = 2,
    "project" = 3
}

// События, происходящие с контекстом
type AuthorizationActions = {
    // Выполнение запроса авторизации пользователя
    onAuthorize: { (email: string, password: string): Promise<boolean> }

    // Обработка запроса сброса пароля
    onResetPassword: { (email: string): Promise<void> }

    // Выполнение установки нового пароля по токену сброса пароля
    onChangePasswordByResetToken: { (token: string, newPassword: string): Promise<void> }

    // Получение токена авторизации
    getAuthorizationToken: { (token?: string): string }

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

    // Изменение типа отображаемого в данный момент меню
    onChangeMenuType: {(menuType: "realm" | "domain" | "project"): void}

    // Установка текущего домена пользователя
    setDomain: {(domain: string): void}

    // Установка текущего проекта пользователя
    setProject: {(project: string): void}

    // Обработка перехода на какие-то страницы при наличии флага редиректа
    onRedirectToUserPage: {(callback: {(): void}): void}

    // Обработка перезагрузки данных по доменам и проектам, доступным пользователю
    onReloadDomainsAndProjects: {(): Promise<void>}
};

// Свойства контекста по умолчанию
class DefaultContext implements AuthorizationContext {
    authToken: string = "";
    isRequestInProgress: boolean = false;
    userInfo: UserInfoData | undefined;
    menuType: "realm" | "domain" | "project";
    domain: string = "";
    project: string = "";
    isNeedRedirectAfterAuth: boolean = false;
    domains: DomainData[] = [];
    projects: ProjectData[] = [];
}

// Создаем изначальный State
const context$ = new BehaviorSubject<AuthorizationContext>(new DefaultContext);

// Контекст для обработки изменения токена
const tokenContext$ = new Subject<string| undefined>();

/**
 * Обработка перехода на какие-то страницы при наличии флага редиректа
 * @param callback
 */
const onRedirectToUserPage: AuthorizationActions['onRedirectToUserPage'] = callback => {
    const {isNeedRedirectAfterAuth} = context$.getValue()
    if (!isNeedRedirectAfterAuth) {
        return
    }

    context$.next({
        ...context$.getValue(),
        isNeedRedirectAfterAuth: false,
    })

    return callback()
}

/**
 * Изменение типа отображаемого в данный момент меню
 * @param menuType
 */
const onChangeMenuType: AuthorizationActions['onChangeMenuType'] = menuType => {
    context$.next({
        ...context$.getValue(),
        menuType: menuType
    })
}

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

// Шина на обновление домена
const updateDomain$ = context$.pipe(
    distinctUntilKeyChanged("domain"),
    map(value => value.domain)
)
// Шина на обновление проекта
const updateProject$ = context$.pipe(
    distinctUntilKeyChanged("project"),
    map(value => value.project)
)

// Шина на обновление уровня меню
const updateLevel$ = context$.pipe(
    distinctUntilKeyChanged("menuType"),
    map(value => value.menuType)
)

/**
 * Обработка перезагрузки данных по доменам и проектам, доступным пользователю
 */
export const onReloadDomainsAndProjects: AuthorizationActions['onReloadDomainsAndProjects'] = async () => {
    try {
        const domainsAndProjects = await allDomainsAndProjectsLoader().Load()

        context$.next({
            ...context$.getValue(),
            ...domainsAndProjects,
        })
    } catch (e) {
        notificationsDispatcher().dispatch({
            message: i18n.t(`Не удалось обновить список доменов и проектов`),
            type: "error"
        })
    }
}

/**
 * Загрузка данных авторизации пользователя по переданному токену
 * @param token
 */
const loadAuthorizationData = async (token: string): Promise<AuthorizationContext> => {
    const [userProfile, domainsAndProjects] = await Promise.all([
        authService().GetUserInfo(token),
        allDomainsAndProjectsLoader(token).Load(),
    ])

    const domains = userProfile.roles.filter(r => r.level === "domain")
    const projects = userProfile.roles.filter(r => r.level === "project")

    const domain = domains.length === 1 ? domains[0].id : ""
    const project = domain.length === 0 && projects.length === 1 ? projects[0].id : ""

    return {
        ...new DefaultContext(),
        ...domainsAndProjects,
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
    const tokenUpd = tokenContext$.pipe(throttleTime(1000), distinctUntilChanged()).subscribe({
        next: async token => {
            if (token === undefined) {
                return;
            }

            if (0 === token.length) {
                context$.next({
                    ...context$.getValue(),
                    authToken: token,
                    userInfo: undefined,
                })

                return
            }

            try {
                const [userProfile, domainsAndProjects] = await Promise.all([
                    authService().GetUserInfo(token),
                    allDomainsAndProjectsLoader(token).Load(),
                ])

                context$.next({
                    ...context$.getValue(),
                    ...domainsAndProjects,
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

            document.cookie = `token=${token || ""}; path=/;`
        }
    })

    tokenCookieSet.add(
        updateDomain$.subscribe(value => {
            if (clientServerDetector().isServer()) {
                return
            }

            document.cookie = `domain=${value || ""}; path=/;`


        })
    )

    tokenCookieSet.add(
        updateProject$.subscribe(value => {
            if (clientServerDetector().isServer()) {
                return
            }

            document.cookie = `project=${value || ""}; path=/;`
        })
    );

    tokenCookieSet.add(
        updateLevel$.subscribe(value => {
            if (clientServerDetector().isServer()) {
                return
            }

            document.cookie = `level=${levelEnum[value] || ""}; path=/;`
        })
    )

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
export const getAuthorizationToken = (token?: string) => {
    if (token) {
        return token
    }

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
            isNeedRedirectAfterAuth: true,
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
export type WithAuthorization<T = {}> =
    T
    & AuthorizationContext
    & AuthorizationActions;

// Тип, описывающий текущий HOC компонент
type HocType = { <T>(Component: React.ComponentType<WithAuthorization<T>>): React.ComponentType<T> };

// Все доступные действия. Собираются для последующего экспорта
const actions: AuthorizationActions = {
    getAuthorizationToken,
    onAuthorize,
    onLogout,
    onResetPassword,
    onChangePasswordByResetToken,
    getCurrentState,
    setCurrentState,
    initializeContextBus,
    initializeContextData,
    onChangeMenuType,
    setProject,
    setDomain,
    onRedirectToUserPage,
    onReloadDomainsAndProjects,
}

/**
 * Хук для использования данных авторизации там, где нет возможности использовать
 * HOC или из соображений качества кода лучше использовать хук
 */
export const useAuthorization = (...pipeModifications: OperatorFunction<any, AuthorizationContext>[]): WithAuthorization => {
    const [contextValue, setContextValue] = useState(context$.getValue())
    useEffect(() => {
        const subscription = context$
            // @ts-ignore
            .pipe(...pipeModifications)
            .subscribe({
                next: data => setContextValue(data)
            })

        return () => {
            try {
                subscription.unsubscribe()
            } catch (e) {}
        }
    })

    return {
        ...contextValue,
        ...actions
    }
}

// HOC для работы с авторизацией
const AuthorizationHoc = (...pipeModifications: OperatorFunction<any, AuthorizationContext>[]) => withBehaviourSubject(
    context$,
    {...actions},
    ...pipeModifications
) as HocType;

// Экспортируем HOC
export default AuthorizationHoc;
