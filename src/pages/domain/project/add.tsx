import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../components/EditPage";
import {PageWithEntityEdit} from "../../../components/EditPage/type";

// Компонент страницы создания
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async (): Promise<PageWithEntityEdit> => ({
    title: "pages.project.add.title",
    header: "pages.project.add.header",
    entityEditSchema: "project",
    permissionCheckPermission: "UPDATE_PROJECTS",
    permissionCheckLevel: "domain",
    pageMenuType: "domain",
})

// Экспортируем компонент
export default EditPageContent