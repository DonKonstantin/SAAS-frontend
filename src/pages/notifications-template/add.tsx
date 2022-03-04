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
    title: "pages.notifications_template.add.title",
    header: "pages.notifications_template.add.header",
    entityEditSchema: "notifications_template",
    permissionCheckPermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckCreatePermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckEditPermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckDeletePermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default EditPageContent
