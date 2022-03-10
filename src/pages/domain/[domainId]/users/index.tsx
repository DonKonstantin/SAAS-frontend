import React from 'react';
import {NextPage} from "next";
import {PageWithEntityList} from "../../../../components/ListPage/types";
import ListPage from "../../../../components/ListPage";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async ({query}): Promise<PageWithEntityList> => ({
    title: "pages.users.list.title",
    header: "pages.users.list.header",
    entityListSchema: "user",
    permissionCheckPermission: "READ_USERS",
    permissionCheckCreatePermission: "CREATE_USERS",
    permissionCheckEditPermission: "CHANGE_USERS",
    permissionCheckDeletePermission: "DELETE_USERS",
    permissionCheckLevel: "project",
    entityListAdditionFilter: {parent: `{_equals: ${query.domainId}}`},
    pageMenuType: "domain"
})

// Экспортируем компонент
export default ListingPage
