import React, {FC} from 'react';
import {GetStaticProps} from "next";
import {PageWithEntityList} from "../../components/ListPage/types";
import ListPage from "../../components/ListPage";

// Компонент страницы проекта
const ListingPage: FC = () => {
    return (
        <ListPage />
    )
}

// Загрузка данных CRM на стороне сервера
export const getStaticProps: GetStaticProps = async (): Promise<{props: PageWithEntityList}> => {
    return {
        props: {
            title: "pages.domain.list.title",
            header: "pages.domain.list.header",
            entityListSchema: "domain",
            permissionCheckEditPermission: "UPDATE_DOMAINS"
        }
    }
}

// Экспортируем компонент
export default ListingPage