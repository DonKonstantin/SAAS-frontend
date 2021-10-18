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
    title: "pages.role.list.title",
    header: "pages.role.list.header",
    entityListSchema: "role",
    permissionCheckPermission: "CHANGE_ROLES",
    permissionCheckLevel: "project",
})

// Экспортируем компонент
export default ListingPage