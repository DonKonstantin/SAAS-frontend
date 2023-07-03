import React from 'react';
import {NextPage} from "next";
import {PageWithEntityList} from "../../../../../../components/ListPage/types";
import ListPage from "../../../../../../components/ListPage";
import {allRoles} from "../../../../../../services/loaders/allRoles";
import GetToken from "../../../../../../services/helpers/GetToken";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async (request): Promise<PageWithEntityList> => {
    let filter: { [T: string]: any } = {id: `{_equals: 0}`}

    const {query} = request
    const token = GetToken(request)
    if (0 !== token.length) {
        const roles = await allRoles(token).Load()
        const roleIds = roles.roles.filter(r => r.structure_item_id === query.projectId).map(r => r.id)

        if (0 !== roleIds.length) {
            filter = {roles_id: `{_in: [${roleIds.join(",")}]}`}
        }
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
        pageMenuType: "project"
    }
}

// Экспортируем компонент
export default ListingPage
