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
            title: "pages.role.list.title",
            header: "pages.role.list.header",
            entityListSchema: "role",
            permissionCheckPermission: "CHANGE_ROLES",
            permissionCheckLevel: "project",
        }
    }
}

// Экспортируем компонент
export default ListingPage