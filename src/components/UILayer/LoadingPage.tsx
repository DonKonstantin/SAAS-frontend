import Head from "next/head";
import React from "react";
import {useTranslation} from "react-i18next";

// Компонент вывода страницы загрузки данных
const LoadingPage = () => {
    const {t} = useTranslation()

    const title = `${t(`UI.meta.title.prefix`)}${t(`UI.pages.loading.title`)}${t(`UI.meta.title.suffix`)}`
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title"/>
            </Head>
            <div className={"loading-page"}>
                <div className="spinner">
                    <div className="spinner-item"/>
                    <div className="spinner-item"/>
                    <div className="spinner-item"/>
                </div>
            </div>
        </>
    )
}

// Экспортируем компонент
export default LoadingPage