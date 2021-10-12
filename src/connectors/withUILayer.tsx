import React, {ReactNode} from "react";
import UILayer from "../components/UILayer";
import {NextPage} from "next";
import {PageWithMetaTags} from "../containers/UILayer/PageWithMetaTags";
import {withRouter} from "next/router";
import {WithRouterProps} from "next/dist/client/with-router";

// Свойства страницы
type AppWithPageProps<T extends object> = T & {
    pageProps: PageWithMetaTags<{}>
}

/**
 * Подключает UI к странице
 *
 * @param Application
 */
export default function withUILayer<T extends object>(Application: NextPage<AppWithPageProps<T>>): React.ComponentClass<T> {
    /**
     * State компонента UI
     */
    interface WithUIConnectorState {
        isMenuOpen: boolean
    }

    /**
     * Компонент основного слоя UI
     */
    class WithUIConnector extends React.Component<WithRouterProps & AppWithPageProps<T>, WithUIConnectorState> {
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
         * Конструктор компонента
         * @param props
         */
        constructor(props: WithRouterProps & AppWithPageProps<T>) {
            super(props);
            this.state = {
                isMenuOpen: false
            }
        }

        /**
         * Рендеринг компонента
         */
        render(): ReactNode {
            let {title = "", isNeedUI} = this.props?.pageProps || {}

            // Обарботка ошибки 404
            if (this.props.router.pathname === "/404") {
                title = "UI.pages.error.404"
                isNeedUI = false
            }

            // Обарботка ошибки 500
            if (this.props.router.pathname === "/500") {
                title = "UI.pages.error.500"
                isNeedUI = false
            }

            return (
                <UILayer title={title} isNeedUI={isNeedUI}>
                    <Application {...this.props}/>
                </UILayer>
            )
        }
    }

    // @ts-ignore
    return withRouter(WithUIConnector)
}
