import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../../../../../components/EditPage";

// Компонент страницы редактирования связного плэйлиста
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({query}) => ({
    title: "project-playlists.edit.title",
    header: "project-playlists.edit.header",
    entityEditSchema: "project_playlist",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "EDIT_PROJECT_PLAYLISTS",
    permissionCheckLevel: "project",
    pageMenuType: "project"
})

// Экспортируем компонент
export default EditPageContent
