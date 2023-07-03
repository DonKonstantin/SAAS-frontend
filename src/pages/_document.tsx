import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document'
import theme from "../components/UILayer/theme";

/**
 * Класс шаблона документа страницы
 */
export default class RootDocument extends Document {
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
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}