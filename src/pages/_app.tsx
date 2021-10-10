import App, {AppContext} from 'next/app'
import React from 'react'
import withCoreConnections from "../connectors/withCoreConnections";

import '../styles/styles.scss'

/**
 * Основная обертка приложения
 */
class AdminApplication extends App {
    /**
     * Предварительная загрузка данных страницы
     * @param _
     */
    static async getInitialProps({Component, ctx}: AppContext): Promise<any> {
        let pageProps = {};
        if (Component.getInitialProps !== undefined) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps: {...pageProps}}
    }

    /**
     * Рендеринг страницы
     */
    render() {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}

// Экспортируем приложение
// @ts-ignore
export default withCoreConnections(AdminApplication)