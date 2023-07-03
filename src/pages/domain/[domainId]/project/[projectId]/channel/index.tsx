import React from 'react';
import { NextPage } from "next";
import { PageWithEntityList } from "../../../../../../components/ListPage/types";
import ListPage from "../../../../../../components/ListPage";

// Компонент страницы каналов проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async ({ query }): Promise<PageWithEntityList> => {

    return {
        title: "pages.project_channel.list.title",
        header: "pages.project_channel.list.header",
        entityListSchema: "project_channel",
        permissionCheckPermission: "READ_PROJECT_CHANNELS",
        permissionCheckCreatePermission: "EDIT_PROJECT_CHANNELS",
        permissionCheckEditPermission: "EDIT_PROJECT_CHANNELS",
        permissionCheckDeletePermission: "EDIT_PROJECT_CHANNELS",
        pageMenuType: "project",
        permissionCheckLevel: "project",
        entityListAdditionFilter: { project_id: `{ _equals: ${query.projectId}}` },
    }
}

// Экспортируем компонент
export default ListingPage
