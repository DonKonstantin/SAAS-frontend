import React from 'react';
import {NextPage} from "next";
import EditPage from "../../../components/EditPage";
import {PageWithEntityEdit} from "../../../components/EditPage/type";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({query}): Promise<PageWithEntityEdit> => ({
    title: "pages.domain.edit.title",
    header: "pages.domain.edit.header",
    entityEditSchema: "domain",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "UPDATE_DOMAINS",
    permissionCheckLevel: "domain",
})

// Экспортируем компонент
export default EditPageContent