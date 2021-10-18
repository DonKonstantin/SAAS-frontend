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
    title: "pages.users.list.title",
    header: "pages.users.list.header",
    entityListSchema: "user",
    permissionCheckPermission: "READ_USERS",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ListingPage