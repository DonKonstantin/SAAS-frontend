import React from 'react';
import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import theme from "../components/UILayer/theme";
import {ServerStyleSheets} from '@mui/styles';

/**
 * Класс шаблона документа страницы
 */
export default class RootDocument extends Document {
    /**
     * Генерация основных свойств страницы
     *
     * @param ctx
     */
    static async getInitialProps(ctx: DocumentContext) {
        // Render app and page and get the context of the page with collected side effects.
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        };
    }

    /**
     * Основной шаблон документа
     */
    render() {
        return (
            <Html>
                <Head>
                    {/* PWA primary color */}
                    <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
                    <link rel="manifest" href="/static/favicon/site.webmanifest"/>
                    <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
                    <meta name="msapplication-TileColor" content="#da532c"/>
                    <meta name="theme-color" content={theme.palette.primary.main}/>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                </Head>
                <body className="custom_class">
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}