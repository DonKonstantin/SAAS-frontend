import React, {ReactNode} from 'react';
import {AvailableAction, ReduxStore} from "../reduxStore/ReduxStore";
import {reduxFactory} from "../reduxStore";
import {Store} from "redux";
import {ReduxAction} from "../reduxStore/system/ReduxAction";
import {Provider} from "react-redux";
import {NextPage} from "next";
import cookies from "next-cookies";
import {DeepPartial} from "../services/types";
import {clientServerDetector} from "../services/clientServerDetector";
import {serverSideReduxStoreLoader} from "../reduxStore/server";

export interface PageWithRedux {
    store: DeepPartial<ReduxStore>
}

/**
 * Данная обертка подключает Redux Store к приложению, а так-же обеспечивает его базовую загрузку
 * на стороне сервера
 *
 * @param Application
 */
export default function withRedux<T extends PageWithRedux>(Application: NextPage<T>): React.ComponentClass<T> {
    return class WithReduxConnector extends React.Component<T> {
        private readonly store: Store<ReduxStore, ReduxAction<AvailableAction>>;

        /**
         * Базовая загрузка Redux
         *
         * @param context
         */
        static async getInitialProps(context: any): Promise<Partial<T>> {
            let token = "";
            if (context.ctx) {
                const cookie = cookies(context.ctx);
                if (typeof cookie.token === "string") {
                    token = cookie.token
                }
            }

            let appProps = {};
            if (Application.getInitialProps !== undefined) {
                appProps = await Application.getInitialProps(context);
            }

            // Загружаем Store на стороне сервера. Нельзя использовать Redux Saga для загрузки данных.
            // т.к. сервер для preload признает только этот метод.
            let store: DeepPartial<ReduxStore> = {};
            if (clientServerDetector().isServer()) {
                store = await serverSideReduxStoreLoader().Load({
                    token: token,
                    initialProps: appProps,
                })
            }

            // @ts-ignore
            return {
                ...appProps,
                store: store,
            }
        }

        /**
         * Конструктор компонента
         *
         * @param props
         */
        constructor(props: T) {
            super(props);

            // @ts-ignore
            this.store = reduxFactory().make(props.store);
        }

        /**
         * Рендеринг обертки
         */
        render(): ReactNode {
            return (
                <Provider store={this.store}>
                    <Application {...this.props} />
                </Provider>
            )
        }
    }
}


