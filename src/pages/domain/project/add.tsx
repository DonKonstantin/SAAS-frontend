import React, {FC} from 'react';
import {GetStaticProps} from "next";
import EditPage from "../../../components/EditPage";
import {PageWithEntityEdit} from "../../../components/EditPage/type";

// Компонент страницы создания
const EditPageContent: FC = () => {
    return (
        <EditPage/>
    )
}

// Загрузка данных CRM на стороне сервера
export const getStaticProps: GetStaticProps = async (): Promise<{ props: PageWithEntityEdit }> => {
    return {
        props: {
            title: "pages.project.add.title",
            header: "pages.project.add.header",
            entityEditSchema: "project",
            permissionCheckPermission: "UPDATE_PROJECTS",
            pageMenuType: "domain",
        }
    }
}

// Экспортируем компонент
export default EditPageContent