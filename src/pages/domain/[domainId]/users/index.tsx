import React from 'react';
import {NextPage} from "next";
import {PageWithEntityList} from "../../../../components/ListPage/types";
import ListPage from "../../../../components/ListPage";
import {allRoles} from "../../../../services/loaders/allRoles";
import Cookies from "universal-cookie";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async ({query, req}): Promise<PageWithEntityList> => {
    let roleIds: string[] = []
    const cookie = new Cookies(req ? req.headers.cookie || "" : document.cookie);
    if (typeof cookie.get('token') === "string") {
        const token = cookie.get('token')

        const roles = await allRoles(token).Load()
        roleIds = roles.roles.filter(r => r.structure_item_id === query.domainId).map(r => r.id)
    }

    let filter: { [T: string]: any } = {id: `{_equals: 0}`}
    if (0 !== roleIds.length) {
        filter = {roles_id: `{_in: [${roleIds.join(",")}]}`}
    }

    return {
        title: "pages.users.list.title",
        header: "pages.users.list.header",
        entityListSchema: "user",
        permissionCheckPermission: "READ_USERS",
        permissionCheckCreatePermission: "CREATE_USERS",
        permissionCheckEditPermission: "EDIT_USERS",
        permissionCheckDeletePermission: "DELETE_USERS",
        permissionCheckLevel: "project",
        entityListAdditionFilter: filter,
        pageMenuType: "domain"
    }
}

// Экспортируем компонент
export default ListingPage
