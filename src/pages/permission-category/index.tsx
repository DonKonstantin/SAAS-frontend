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
    title: "pages.permission_category.list.title",
    header: "pages.permission_category.list.header",
    entityListSchema: "permission_category",
    permissionCheckPermission: "EDIT_PERMISSION_CATEGORIES",
    permissionCheckEditPermission: "EDIT_PERMISSION_CATEGORIES",
    permissionCheckCreatePermission: "EDIT_PERMISSION_CATEGORIES",
    permissionCheckDeletePermission: "EDIT_PERMISSION_CATEGORIES",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ListingPage
