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
    title: "pages.campaign.add.title",
    header: "pages.campaign.add.header",
    entityEditSchema: "campaign",
    permissionCheckPermission: "EDIT_CAMPAIGNS",
    permissionCheckLevel: "project",
    pageMenuType: "project"
})

// Экспортируем компонент
export default EditPageContent
