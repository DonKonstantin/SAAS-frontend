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
    title: "pages.permission.add.title",
    header: "pages.permission.add.header",
    entityEditSchema: "permission",
    permissionCheckPermission: "EDIT_PERMISSIONS",
    permissionCheckEditPermission: "EDIT_PERMISSIONS",
    permissionCheckCreatePermission: "EDIT_PERMISSIONS",
    permissionCheckDeletePermission: "EDIT_PERMISSIONS",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default EditPageContent
