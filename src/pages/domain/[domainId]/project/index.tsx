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
ListingPage.getInitialProps = async ({query}): Promise<PageWithEntityList & {hideButtonDeleteItems: boolean}> => ({
    title: "pages.project.list.title",
    header: "pages.project.list.header",
    entityListSchema: "project",
    entityListAdditionFilter: {parent: `{_equals: ${query.domainId}}`},
    permissionCheckEditLevel: "project",
    permissionCheckEditPermission: "EDIT_PROJECT",
    permissionCheckCreatePermission: "CREATE_PROJECT",
    permissionCheckDeletePermission: "DELETE_PROJECT",
    permissionCheckCreateLevel: "domain",
    pageMenuType: "domain",
    hideButtonDeleteItems: true
})

// Экспортируем компонент
export default ListingPage
