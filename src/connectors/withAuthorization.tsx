import React, {ReactNode} from "react";
import {NextPage} from "next";
import LoginPage from "../components/LoginPage";
import cookies from "next-cookies";
import {
    AuthorizationContext,
    getCurrentState,
    initializeContextData,
    setCurrentState
} from "../context/AuthorizationContext";

/**
 * Подключает обязательную авторизацию к странице
 * @param Application
 */
export default function withAuthorization<T>(Application: NextPage<T>): React.ComponentClass<T> {
    /**
     * Дополнительные свойства компонента
     */
    type AuthorizationProps<T> = T & {
        token: string
        loadedAuthorizationContextState?: AuthorizationContext
        pageProps?: {
            changePasswordToken?: string
            isNeedShowChangePassword?: boolean
            isPrivate?: boolean
        }
    }

    /**
     * Обертка, проверяющая авторизацию пользователя в системе. Если пользователь не авторизован, редиректит на
     * страницу авторизации
     */
    class WithAuthorizationConnector extends React.Component<AuthorizationProps<T>> {

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

            let token = "";
            if (context.ctx) {
                const cookie = cookies(context.ctx);
                if (typeof cookie.token === "string") {
                    token = cookie.token
                }
            }

            let data: AuthorizationContext | undefined = undefined;
            if (0 !== token.length) {
                await initializeContextData(token)
                data = getCurrentState()
            }

            return {
                ...appProps,
                token: token,
                loadedAuthorizationContextState: data,
            }
        }

        /**
         * Подписываем приложение на контекст авторизации при создании компонента
         * @param props
         */
        constructor(props) {
            super(props);

            if (props.loadedAuthorizationContextState) {
                setCurrentState(props.loadedAuthorizationContextState)
            }
        }

        /**
         * Рендеринг компонента
         */
        render(): ReactNode {
            const {
                pageProps = {}
            } = this.props;

            const {
                isPrivate,
                changePasswordToken,
                isNeedShowChangePassword
            } = pageProps

            return (
                <LoginPage
                    isPrivate={isPrivate}
                    changePasswordToken={changePasswordToken}
                    isNeedShowChangePassword={isNeedShowChangePassword}
                >
                    <Application {...this.props}/>
                </LoginPage>
            )
        }
    }

    return WithAuthorizationConnector;
}