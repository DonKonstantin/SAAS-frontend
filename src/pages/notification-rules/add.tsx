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
    title: "pages.notification_config.add.title",
    header: "pages.notification_config.add.header",
    entityEditSchema: "notification_config",
    permissionCheckPermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckCreatePermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckEditPermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckDeletePermission: "EDIT_NOTIFICATION_CONFIG",
    permissionCheckLevel: "realm",
})

// Экспортируем компонент
export default EditPageContent
