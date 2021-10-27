import React from 'react';
import {NextPage} from "next";
import ListPage from "../../../../components/ListPage";
import {PageWithEntityList} from "../../../../components/ListPage/types";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async ({query}): Promise<PageWithEntityList> => ({
    title: "pages.project.list.title",
    header: "pages.project.list.header",
    entityListSchema: "project",
    entityListAdditionFilter: {parent: `{_equals: ${query.domainId}}`},
    permissionCheckEditPermission: "UPDATE_PROJECTS",
    permissionCheckEditLevel: "project",
    permissionCheckCreatePermission: "UPDATE_PROJECTS",
    permissionCheckCreateLevel: "domain",
    pageMenuType: "domain"
})

// Экспортируем компонент
export default ListingPage