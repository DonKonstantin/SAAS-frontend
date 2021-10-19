import React from 'react';
import {NextPage} from "next";
import ListPage from "../../../components/ListPage";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async () => ({
    title: "pages.project.list.title",
    header: "pages.project.list.header",
    entityListSchema: "project",
    permissionCheckEditPermission: "UPDATE_PROJECTS",
    permissionCheckEditLevel: "project",
    permissionCheckCreatePermission: "UPDATE_PROJECTS",
    permissionCheckCreateLevel: "domain",
    pageMenuType: "domain"
})

// Экспортируем компонент
export default ListingPage