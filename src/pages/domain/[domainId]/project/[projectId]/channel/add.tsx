import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../../../../components/EditPage";

// Компонент страницы создания
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async () => ({
    title: "pages.project_channel.add.title",
    header: "pages.project_channel.add.header",
    entityEditSchema: "project_channel",
    permissionCheckPermission: "EDIT_PROJECT_CHANNELS",
    permissionCheckLevel: "project",
    pageMenuType: "project"
})

// Экспортируем компонент
export default EditPageContent
