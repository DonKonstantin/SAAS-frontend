import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../components/EditPage";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({query}) => ({
    title: "pages.domain.edit.title",
    header: "pages.domain.edit.header",
    entityEditSchema: "domain",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "UPDATE_DOMAINS",
})

// Экспортируем компонент
export default EditPageContent