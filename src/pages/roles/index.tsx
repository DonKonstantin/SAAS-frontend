import React from 'react';
import {NextPage} from "next";
import ListPageWithCopy from "../../components/ListPageWithCopy";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPageWithCopy/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async () => ({
    title: "pages.role.list.title",
    header: "pages.role.list.header",
    entityListSchema: "role",
    permissionCheckLevel: "project",
    permissionCheckPermission: "READ_ROLES",
    permissionCheckEditPermission: "EDIT_ROLES",
    permissionCheckCreatePermission: "EDIT_ROLES",
    permissionCheckDeletePermission: "EDIT_ROLES",
})

// Экспортируем компонент
export default ListingPage
