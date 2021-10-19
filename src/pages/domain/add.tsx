import React from 'react';
import {NextPage} from "next";
import EditPage from "../../components/EditPage";
import {PageWithEntityEdit} from "../../components/EditPage/type";

// Компонент страницы создания
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async (): Promise<PageWithEntityEdit> => ({
    title: "pages.domain.add.title",
    header: "pages.domain.add.header",
    entityEditSchema: "domain",
    permissionCheckPermission: "UPDATE_DOMAINS",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default EditPageContent