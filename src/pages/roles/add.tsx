import React, {FC} from 'react';
import {GetStaticProps} from "next";
import EditPage from "../../components/EditPage";
import {PageWithEntityEdit} from "../../components/EditPage/type";

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
            title: "pages.role.add.title",
            header: "pages.role.add.header",
            entityEditSchema: "role",
            permissionCheckPermission: "CHANGE_ROLES",
            permissionCheckLevel: "project",
        }
    }
}

// Экспортируем компонент
export default EditPageContent