import React, {FC} from 'react';
import {GetStaticProps} from "next";
import {PageWithEntityList} from "../../components/ListPage/types";
import ListPage from "../../components/ListPage";

// Компонент главной страницы проекта
const ListingPage: FC = () => {
    return (
        <ListPage />
    )
}

// Загрузка данных CRM на стороне сервера
export const getStaticProps: GetStaticProps = async (): Promise<{props: PageWithEntityList}> => {
    return {
        props: {
            title: "pages.permission_category.list.title",
            header: "pages.permission_category.list.header",
            entityListSchema: "permission_category",
            permissionCheckPermission: "CHANGE_PERMISSIONS",
            permissionCheckLevel: "realm",
        }
    }
}

// Экспортируем компонент
export default ListingPage