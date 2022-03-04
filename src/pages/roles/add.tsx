import React from 'react';
import {NextPage} from "next";
import EditPage from "../../components/EditPage";

// Компонент страницы создания
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async () => ({
    title: "pages.role.add.title",
    header: "pages.role.add.header",
    entityEditSchema: "role",
    permissionCheckLevel: "project",
    permissionCheckPermission: "EDIT_ROLES",
    permissionCheckCreatePermission: "EDIT_ROLES",
})

// Экспортируем компонент
export default EditPageContent
