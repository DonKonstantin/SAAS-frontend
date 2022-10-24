import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../../../../../components/EditPage";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({query}) => ({
    title: "pages.project_channel.edit.title",
    header: "pages.project_channel.edit.header",
    entityEditSchema: "project_channel",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "EDIT_PROJECT_CHANNELS",
    permissionCheckLevel: "project",
    pageMenuType: "project"
})

// Экспортируем компонент
export default EditPageContent
