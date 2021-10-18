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
    title: "pages.permission.edit.title",
    header: "pages.permission.edit.header",
    entityEditSchema: "permission",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "CHANGE_PERMISSIONS",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default EditPageContent