import React from 'react';
import { NextPage } from "next";
import CampaignInfoGroup
  from "../../../../../../../components/EditPageCustomFields/CampaignGroup/CampaignSchedule/CampaignInfoGroup";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
  return (
    <CampaignInfoGroup/>
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
