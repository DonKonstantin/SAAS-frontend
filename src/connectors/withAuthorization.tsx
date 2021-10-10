import React, {ReactNode} from "react";
import {ReduxStore} from "../reduxStore/ReduxStore";
import {authService} from "../services/authService";
import {Action, Dispatch} from "redux";
import {dispatcher} from "../reduxStore/actions";
import {AuthServiceInterface} from "../services/authService/interfaces";
import {connect} from "react-redux";
import {ClientServerDetector} from "../services/clientServerDetector/ClientServerDetector";
import {clientServerDetector} from "../services/clientServerDetector";
import getConfig from "next/config";
import LoginPage from "../containers/LoginPage";
import {NextPage} from "next";

/**
 * Подключает обязательную авторизацию к странице
 *
 * @param Application
 */
export default function withAuthorization<T>(Application: NextPage<T>): React.ComponentClass<T> {
    /**
     * Дополнительные свойства компонента
     */
    type AuthorizationProps<T> = T & {
        token: string
        onResetAuthorization: () => void
        onUpdateToken: (token: string) => void
        authService: () => AuthServiceInterface
        clientServerDetector: () => ClientServerDetector
    }

    /**
     * State компонента
     */
    interface AuthorizationState {
        interval: NodeJS.Timeout | undefined
    }

    /**
     * Обертка, проверяющая авторизацию пользователя в системе. Если пользователь не авторизован, редиректит на
     * страницу авторизации
     */
    class WithAuthorizationConnector extends React.Component<AuthorizationProps<T>, AuthorizationState>{
        /**
         * Проброс базовых свойств компонента
         *
         * @param context
         */
        static async getInitialProps(context: any): Promise<any> {
            let appProps = {};
            if (Application.getInitialProps !== undefined) {
                appProps = await Application.getInitialProps(context);
            }

            return {...appProps}
        }

        /**
         * Мапит текущий Redux state в свойства компонента
         *
         * @param store
         * @param globalProperties
         */
        static mapStoreToProperties(
            store: ReduxStore,
            globalProperties: Partial<AuthorizationProps<T>>
        ): Partial<AuthorizationProps<T>> {
            return {
                ...globalProperties,
                token: store.Authorization.token,
                authService: authService,
                clientServerDetector: clientServerDetector
            }
        }

        /**
         * Подключение обработчиков событий к Redux store
         *
         * @param _dispatch
         */
        static mapActionsToStore(_dispatch: Dispatch<Action>): AuthorizationProps<any> {
            return {
                onResetAuthorization: () => {
                    dispatcher().dispatch<"AUTHORIZATION_RESET">("AUTHORIZATION_RESET", undefined)
                },
                onUpdateToken: (token: string): void => {
                    dispatcher().dispatch<"AUTHORIZATION_LOGGED_IN">("AUTHORIZATION_LOGGED_IN", token)
                }
            }
        }

        /**
         * Пытаемся обновить токен пользователя, если не удается получить - разлогиниваем пользователя
         */
        componentDidMount() {
            this.refreshToken()

            const {publicRuntimeConfig} = getConfig();
            this.setState({
                interval: setInterval(() => {
                    this.refreshToken()
                }, publicRuntimeConfig.tokenRefreshTimeout * 1000)
            })
        }

        /**
         * Отключаем обновление токена при размонтировании компонента
         */
        componentWillUnmount() {
            if (undefined === this.state.interval) {
                return
            }

            clearInterval(this.state.interval)
            this.setState({
                interval: undefined
            })
        }

        /**
         * Конструктор компонента
         * @param props
         */
        constructor(props: AuthorizationProps<T>) {
            super(props);
            this.state = {
                interval: undefined
            }
        }

        /**
         * Обновление токена пользователя
         */
        private refreshToken() {
            if (this.props.clientServerDetector().isServer() || 0 === this.props.token.length) {
                return
            }

            this.props.authService().RefreshToken()
                .then((data) => {
                    if (undefined === data) {
                        this.props.onResetAuthorization()
                    } else {
                        this.props.onUpdateToken(data)
                    }
                })
                .catch(() => {
                    this.props.onResetAuthorization()
                })
        }

        /**
         * Рендеринг компонента
         */
        render(): ReactNode {
            if (0 === this.props.token.length) {
                return (<LoginPage {...this.props}/>)
            }

            return (<Application {...this.props}/>)
        }
    }

    // @ts-ignore
    return connect(WithAuthorizationConnector.mapStoreToProperties, WithAuthorizationConnector.mapActionsToStore)(WithAuthorizationConnector);
}