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
    title: "pages.domain.list.title",
    header: "pages.domain.list.header",
    entityListSchema: "domain",
    permissionCheckEditPermission: "UPDATE_DOMAINS"
})

// Экспортируем компонент
export default ListingPage