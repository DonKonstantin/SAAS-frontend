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
    title: "pages.notifications_template.edit.title",
    header: "pages.notifications_template.edit.header",
    entityEditSchema: "notifications_template",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckCreatePermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckEditPermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckDeletePermission: "EDIT_NOTIFICATION_TEMPLATES",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default EditPageContent
