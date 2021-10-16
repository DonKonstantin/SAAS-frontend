import {AppProps} from 'next/app'
import React from 'react'
import '../styles/styles.scss'
import LoginPage from "../components/LoginPage";
import UILayout from "../layouts/UILayout";
import SnackbarLayer from "../components/SnackbarLayer";
import MaterialUILayout from "../layouts/MaterialUILayout";
import LocalizationLayer from "../layouts/LocalizationLayer";
import DataLoadingLayer from "../layouts/DataLoadingLayer";
import ListPageProvider from "../components/ListPageParts/ListPageProvider";
import PermissionProvider from "../layouts/PermissionProvider";
import PagePropsProvider from "../layouts/PagePropsProvider";
import EditPageProvider from "../components/EditPage/EditPageProvider";

// Основной шаблон приложения
function CrmApp({Component, pageProps}: AppProps) {
    return (
        <PagePropsProvider {...pageProps}>
            <LocalizationLayer>
                <MaterialUILayout>
                    <DataLoadingLayer>
                        <SnackbarLayer>
                            <LoginPage {...pageProps}>
                                <UILayout {...pageProps}>
                                    <PermissionProvider {...pageProps}>
                                        <ListPageProvider {...pageProps}>
                                            <EditPageProvider {...pageProps}>
                                                <Component {...pageProps} />
                                            </EditPageProvider>
                                        </ListPageProvider>
                                    </PermissionProvider>
                                </UILayout>
                            </LoginPage>
                        </SnackbarLayer>
                    </DataLoadingLayer>
                </MaterialUILayout>
            </LocalizationLayer>
        </PagePropsProvider>
    )
}

// Экспортируем компонент
export default CrmApp