import {AppProps} from 'next/app'
import React from 'react'
import '../styles/styles.scss'
import LoginPage from "../components/LoginPage";
import UILayout from "../layouts/UILayout";
import SnackbarLayer from "../components/SnackbarLayer";
import MaterialUILayout from "../layouts/MaterialUILayout";
import LocalizationLayer from "../layouts/LocalizationLayer";
import DataLoadingLayer from "../layouts/DataLoadingLayer";

// Основной шаблон приложения
function CrmApp({Component, pageProps}: AppProps) {
    return (
        <LocalizationLayer>
            <MaterialUILayout>
                <DataLoadingLayer>
                    <SnackbarLayer>
                        <LoginPage {...pageProps}>
                            <UILayout {...pageProps}>
                                <Component {...pageProps} />
                            </UILayout>
                        </LoginPage>
                    </SnackbarLayer>
                </DataLoadingLayer>
            </MaterialUILayout>
        </LocalizationLayer>
    )
}

// Экспортируем компонент
export default CrmApp