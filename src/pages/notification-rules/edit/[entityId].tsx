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
    title: "pages.notification_config.edit.title",
    header: "pages.notification_config.edit.header",
    entityEditSchema: "notification_config",
    entityEditPrimaryKey: query?.entityId as string,
    permissionCheckPermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckCreatePermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckEditPermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckDeletePermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default EditPageContent
