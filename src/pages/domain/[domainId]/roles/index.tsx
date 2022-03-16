import React from 'react';
import {NextPage} from "next";
import ListPageWithCopy from "../../../../components/ListPageWithCopy";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPageWithCopy/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async ({query}) => ({
    title: "pages.role.list.title",
    header: "pages.role.list.header",
    entityListSchema: "role",
    permissionCheckPermission: "EDIT_ROLES",
    permissionCheckLevel: "project",
    entityListAdditionFilter: {structure_item_id: `{_equals: ${query.domainId}}`},
    pageMenuType: "domain"
})

// Экспортируем компонент
export default ListingPage
