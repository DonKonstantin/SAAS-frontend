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
    title: "pages.notifications_template.list.title",
    header: "pages.notifications_template.list.header",
    entityListSchema: "notifications_template",
    permissionCheckPermission: "READ_NOTIFICATION_TEMPLATES",
    permissionCheckCreatePermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckEditPermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckDeletePermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ListingPage
