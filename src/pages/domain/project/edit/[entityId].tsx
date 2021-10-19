import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../../components/EditPage";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({query}) => ({
    title: "pages.project.edit.title",
    header: "pages.project.edit.header",
    entityEditSchema: "project",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "UPDATE_PROJECTS",
    permissionCheckLevel: "project",
    pageMenuType: "domain",
})

// Экспортируем компонент
export default EditPageContent