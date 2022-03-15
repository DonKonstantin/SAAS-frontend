import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../../components/EditPage";

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
    permissionCheckPermission: "EDIT_ROLES",
    permissionCheckLevel: "project",
    pageMenuType: "domain"
})

// Экспортируем компонент
export default EditPageContent
