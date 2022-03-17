import React from 'react';
import {NextPage} from "next";
import ListPageWithCopy from "../../../../components/ListPageWithCopy";
import LoadDomainsAndProjectsByRequest from "../../../../services/helpers/LoadDomainsAndProjectsByRequest";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPageWithCopy/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async (query) => {
    let filter = {structure_item_id: `{_equals: 0}`}
    const structures = await LoadDomainsAndProjectsByRequest(query)

    if (0 !== structures.length) {
        filter = {structure_item_id: `{_in: [${structures.join(",")}]}`}
    }

    return {
        title: "pages.role.list.title",
        header: "pages.role.list.header",
        entityListSchema: "role",
        permissionCheckPermission: "EDIT_ROLES",
        permissionCheckLevel: "domain",
        entityListAdditionFilter: filter,
        pageMenuType: "domain"
    }
}

// Экспортируем компонент
export default ListingPage
