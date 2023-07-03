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
    title: "pages.users.add.title",
    header: "pages.users.add.header",
    entityEditSchema: "user",
    permissionCheckPermission: "CREATE_USERS",
    permissionCheckLevel: "project",
    pageMenuType: "project"
})

// Экспортируем компонент
export default EditPageContent
