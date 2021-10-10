import React from 'react';
import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import theme from "../components/UILayer/theme";
import { ServerStyleSheets } from '@material-ui/core/styles';

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
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}