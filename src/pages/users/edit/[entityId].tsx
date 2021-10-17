import React, {FC} from 'react';
import {GetServerSideProps} from "next";
import EditPage from "../../../components/EditPage";

// Компонент страницы редактирования
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
            title: "pages.users.edit.title",
            header: "pages.users.edit.header",
            entityEditSchema: "user",
            entityEditPrimaryKey: context.params?.entityId,
            permissionCheckPermission: "CHANGE_USERS",
            permissionCheckLevel: "project",
        }
    }
}

// Экспортируем компонент
export default EditPageContent