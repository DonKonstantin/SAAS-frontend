import React from 'react';
import {NextPage} from "next";
import ListPage from "../../components/ListPage";
import {PageWithEntityList} from "../../components/ListPage/types";

// Компонент листинга паспортов обектов уровня realm
const ObjectsPassportListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ObjectsPassportListingPage.getInitialProps = async (): Promise<PageWithEntityList> => ({
    title: "objects-passport-list.title",
    header: "objects-passport-list.header",
    entityListSchema: "object_passport",
    permissionCheckPermission: "READ_OBJECT_PASSPORTS",
    permissionCheckEditPermission: "EDIT_OBJECT_PASSPORTS",
    permissionCheckCreatePermission: "EDIT_OBJECT_PASSPORTS",
    permissionCheckDeletePermission: "EDIT_OBJECT_PASSPORTS",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ObjectsPassportListingPage