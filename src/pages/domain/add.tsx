import React from 'react';
import {NextPage} from "next";
import EditPage from "../../components/EditPage";

// Компонент страницы создания
const EditPageContent: NextPage = () => {
    return (
        <EditPage/>
    )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async () => ({
    title: "pages.domain.add.title",
    header: "pages.domain.add.header",
    entityEditSchema: "domain",
    permissionCheckPermission: "UPDATE_DOMAINS",
})

// Экспортируем компонент
export default EditPageContent