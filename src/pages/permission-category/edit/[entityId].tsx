import React, {FC} from 'react';
import {GetServerSideProps} from "next";
import EditPage from "../../../components/EditPage";

// Компонент главной страницы проекта
const EditPageContent: FC = () => {
    return (
        <EditPage/>
    )
}

// Загрузка данных CRM на стороне сервера
export const getServerSideProps: GetServerSideProps = async context => {
    if (!context.params?.entityId) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            title: "pages.permission_category.edit.title",
            header: "pages.permission_category.edit.header",
            entityEditSchema: "permission_category",
            entityEditPrimaryKey: context.params?.entityId,
            permissionCheckPermission: "CHANGE_PERMISSIONS",
            permissionCheckLevel: "realm",
        }
    }
}

// Экспортируем компонент
export default EditPageContent