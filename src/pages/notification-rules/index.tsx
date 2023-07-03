import React from 'react';
import {NextPage} from "next";
import ListPage from "../../components/ListPage";
import {PageWithEntityList} from "../../components/ListPage/types";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async (): Promise<PageWithEntityList> => ({
    title: "pages.notification_config.list.title",
    header: "pages.notification_config.list.header",
    entityListSchema: "notification_config",
    permissionCheckPermission: "READ_NOTIFICATION_CONFIG",
    permissionCheckCreatePermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckEditPermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckDeletePermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ListingPage
