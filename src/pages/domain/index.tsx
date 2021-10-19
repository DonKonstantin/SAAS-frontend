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
    title: "pages.domain.list.title",
    header: "pages.domain.list.header",
    entityListSchema: "domain",
    permissionCheckEditPermission: "UPDATE_DOMAINS",
    permissionCheckEditLevel: "domain",
    permissionCheckCreatePermission: "UPDATE_DOMAINS",
    permissionCheckCreateLevel: "realm",
})

// Экспортируем компонент
export default ListingPage