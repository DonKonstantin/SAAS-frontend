import React from 'react';
import { NextPage } from "next";
import { PageWithEntityList } from "../../../../../../components/ListPage/types";
import ListPage from "../../../../../../components/ListPage";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async ({ query }): Promise<PageWithEntityList> => {

    return {
        title: "pages.campaign.list.title",
        header: "pages.campaign.list.header",
        entityListSchema: "campaign",
        permissionCheckPermission: "READ_CAMPAIGNS",
        permissionCheckCreatePermission: "EDIT_CAMPAIGNS",
        permissionCheckEditPermission: "EDIT_CAMPAIGNS",
        permissionCheckDeletePermission: "EDIT_CAMPAIGNS",
        pageMenuType: "project",
        permissionCheckLevel: "project",
        entityListAdditionFilter: { project_id: `{ _equals: ${query.projectId}}` },
    }
}

// Экспортируем компонент
export default ListingPage
