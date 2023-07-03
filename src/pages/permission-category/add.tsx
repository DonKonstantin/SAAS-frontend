import React from 'react';
import {NextPage} from "next";
import EditPage from "../../components/EditPage";

// Компонент страницы проекта
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async () => ({
    title: "pages.permission_category.add.title",
    header: "pages.permission_category.add.header",
    entityEditSchema: "permission_category",
    permissionCheckPermission: "EDIT_PERMISSION_CATEGORIES",
    permissionCheckEditPermission: "EDIT_PERMISSION_CATEGORIES",
    permissionCheckCreatePermission: "EDIT_PERMISSION_CATEGORIES",
    permissionCheckDeletePermission: "EDIT_PERMISSION_CATEGORIES",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default EditPageContent
