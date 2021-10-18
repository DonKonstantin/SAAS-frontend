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
    title: "pages.permission.list.title",
    header: "pages.permission.list.header",
    entityListSchema: "permission",
    permissionCheckPermission: "CHANGE_PERMISSIONS",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ListingPage