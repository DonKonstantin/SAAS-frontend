import React from 'react';
import {NextPage} from "next";
import ListPage from "../../components/ListPage";
import {PageWithEntityList} from "../../components/ListPage/types";

// Компонент страницы проекта
const ListingPage: NextPage = () => {
    return (
        <ListPage/>
    )
}

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async (): Promise<PageWithEntityList> => ({
    title: "Все файлы",
    header: "Все файлы",
    entityListSchema: "file",
    permissionCheckPermission: "READ_MEDIA_FILES",
    permissionCheckEditPermission: "EDIT_MEDIA_FILES",
    permissionCheckCreatePermission: "NOT",
    permissionCheckDeletePermission: "DELETE_MEDIA_FILES",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default ListingPage
