import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../../../components/EditPage";
import {PageWithEntityEdit} from "../../../../../components/EditPage/type";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({query}): Promise<PageWithEntityEdit> => ({
    title: "pages.project.edit.title",
    header: "pages.project.edit.header",
    entityEditSchema: "project",
    entityEditPrimaryKey: query?.projectId as string,
    permissionCheckEditPermission: "EDIT_PROJECT",
    permissionCheckDeletePermission: "EDIT_PROJECT",
    permissionCheckLevel: "project",
    pageMenuType: "domain",
})

// Экспортируем компонент
export default EditPageContent
