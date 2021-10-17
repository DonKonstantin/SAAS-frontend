import React, {FC} from 'react';
import {GetStaticProps} from "next";
import EditPage from "../../components/EditPage";
import {PageWithEntityEdit} from "../../components/EditPage/type";

// Компонент страницы проекта
const EditPageContent: FC = () => {
    return (
        <EditPage/>
    )
}

// Загрузка данных CRM на стороне сервера
export const getStaticProps: GetStaticProps = async (): Promise<{ props: PageWithEntityEdit }> => {
    return {
        props: {
            title: "pages.permission.add.title",
            header: "pages.permission.add.header",
            entityEditSchema: "permission",
            permissionCheckPermission: "CHANGE_PERMISSIONS",
            permissionCheckLevel: "realm",
        }
    }
}

// Экспортируем компонент
export default EditPageContent