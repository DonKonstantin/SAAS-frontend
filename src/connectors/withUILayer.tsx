import React, {ReactNode} from "react";
import UILayer from "../components/UILayer";
import UIContent from "../components/UILayer/Content";
import UITopPanel from "../components/UILayer/TopPanel";
import UILeftDrawer from "../components/UILayer/LeftDrawer";
import {NextPage} from "next";
import {PageWithMetaTags} from "../containers/UILayer/PageWithMetaTags";
import Head from "next/head";

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
    return class WithUIConnector extends React.Component<AppWithPageProps<T>, WithUIConnectorState>{
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
        constructor(props: AppWithPageProps<T>) {
            super(props);
            this.state = {
                isMenuOpen: false
            }
        }

        /**
         * Переключение состояния левого меню
         */
        private toggleMenuState() {
            this.setState({
                ...this.state,
                isMenuOpen: !this.state.isMenuOpen,
            })
        }

        /**
         * Рендеринг компонента
         */
        render(): ReactNode {
            let header = ""
            let title = ""

            if (this.props.pageProps) {
                header = this.props.pageProps.header
                title = this.props.pageProps.title
            }

            return (
                <UILayer>
                    <Head>
                        <title>{`OnlogSystem :: ${title}`}</title>
                        <meta property="og:title" content={`OnlogSystem :: ${title}`} key="title" />
                    </Head>
                    <UITopPanel isMenuVisible={this.state.isMenuOpen} header={header} onChangeMenuState={() => this.toggleMenuState()} />
                    <UILeftDrawer isMenuVisible={this.state.isMenuOpen} onChangeMenuState={() => this.toggleMenuState()} />
                    <UIContent classes={{content: "main-container"}}>
                        <Application {...this.props}/>
                    </UIContent>
                </UILayer>
            )
        }
    }
}
