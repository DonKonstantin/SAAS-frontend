import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../components/EditPage";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({query}) => ({
    title: "pages.users.edit.title",
    header: "pages.users.edit.header",
    entityEditSchema: "user",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckLevel: "project",
    permissionCheckPermission: "READ_USERS",
    permissionCheckEditPermission: "EDIT_USERS",
})

// Экспортируем компонент
export default EditPageContent
