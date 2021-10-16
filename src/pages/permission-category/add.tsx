import React, {FC} from 'react';
import {GetStaticProps} from "next";
import EditPage from "../../components/EditPage";
import {PageWithEntityEdit} from "../../components/EditPage/type";

// Компонент главной страницы проекта
const EditPageContent: FC = () => {
    return (
        <EditPage/>
    )
}

// Загрузка данных CRM на стороне сервера
export const getStaticProps: GetStaticProps = async (): Promise<{ props: PageWithEntityEdit }> => {
    return {
        props: {
            title: "pages.permission_category.add.title",
            header: "pages.permission_category.add.header",
            entityEditSchema: "permission_category",
            permissionCheckPermission: "CHANGE_PERMISSIONS",
            permissionCheckLevel: "realm",
        }
    }
}

// Экспортируем компонент
export default EditPageContent