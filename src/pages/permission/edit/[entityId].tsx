import React, {FC} from 'react';
import {GetServerSideProps} from "next";
import EditPage from "../../../components/EditPage";

// Компонент страницы проекта
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
            title: "pages.permission.edit.title",
            header: "pages.permission.edit.header",
            entityEditSchema: "permission",
            entityEditPrimaryKey: context.params?.entityId,
            permissionCheckPermission: "CHANGE_PERMISSIONS",
            permissionCheckLevel: "realm",
        }
    }
}

// Экспортируем компонент
export default EditPageContent