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
            title: "pages.users.list.title",
            header: "pages.users.list.header",
            entityListSchema: "user",
            permissionCheckPermission: "READ_USERS",
            permissionCheckLevel: "realm",
        }
    }
}

// Экспортируем компонент
export default ListingPage