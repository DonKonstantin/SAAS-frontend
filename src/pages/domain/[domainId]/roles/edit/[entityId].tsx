import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../../../components/EditPage";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({query}) => ({
    title: "pages.role.edit.title",
    header: "pages.role.edit.header",
    entityEditSchema: "role",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "EDIT_ROLES",
    permissionCheckLevel: "domain",
    pageMenuType: "domain"
})

// Экспортируем компонент
export default EditPageContent
