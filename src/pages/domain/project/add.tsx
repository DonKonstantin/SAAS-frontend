import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../components/EditPage";

// Компонент страницы создания
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async () => ({
    title: "pages.project.add.title",
    header: "pages.project.add.header",
    entityEditSchema: "project",
    permissionCheckPermission: "UPDATE_PROJECTS",
    pageMenuType: "domain",
})

// Экспортируем компонент
export default EditPageContent