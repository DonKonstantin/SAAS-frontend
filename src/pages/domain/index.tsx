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
    permissionCheckEditLevel: "domain",
    permissionCheckCreateLevel: "realm",
    permissionCheckEditPermission: "EDIT_DOMAIN",
    permissionCheckDeletePermission:"DELETE_DOMAIN",
    permissionCheckCreatePermission: "CREATE_DOMAIN",
})

// Экспортируем компонент
export default ListingPage
