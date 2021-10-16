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
            title: "pages.project.list.title",
            header: "pages.project.list.header",
            entityListSchema: "project",
            permissionCheckEditPermission: "UPDATE_PROJECTS"
        }
    }
}

// Экспортируем компонент
export default ListingPage