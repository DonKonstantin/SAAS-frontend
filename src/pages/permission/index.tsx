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
    title: "pages.permission.list.title",
    header: "pages.permission.list.header",
    entityListSchema: "permission",
    permissionCheckPermission: "READ_PERMISSIONS",
    permissionCheckEditPermission: "EDIT_PERMISSIONS",
    permissionCheckCreatePermission: "EDIT_PERMISSIONS",
    permissionCheckDeletePermission: "EDIT_PERMISSIONS",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ListingPage
