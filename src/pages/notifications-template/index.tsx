import React from 'react';
import {NextPage} from "next";
import ListPage from "../../components/ListPage";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async () => ({
    title: "pages.notifications_template.list.title",
    header: "pages.notifications_template.list.header",
    entityListSchema: "notifications_template",
    permissionCheckPermission: "CHANGE_NOTIFICATIONS",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ListingPage
