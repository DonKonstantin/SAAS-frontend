import React from 'react';
import { NextPage, NextPageContext } from "next";
import CampaignInfoGroup
  from "../../../../../../../components/EditPageCustomFields/CampaignGroup/CampaignInfoGroup";
import CampaignEditContextConnector
  from "../../../../../../../context/CampaignEditContext/CampaignEditContextConnector";

// Компонент страницы редактирования
const EditPageContent: NextPage<{ isnew: string | string[] | undefined }> = ({ isnew }) => {
  const isNew: boolean = isnew === "true";

  return (
    <CampaignEditContextConnector>
      <CampaignInfoGroup isNew={isNew}/>
    </CampaignEditContextConnector>
  )
}

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({ query }: NextPageContext) => {
  const { isnew } = query;

  return ({
    title: "pages.campaign.add.title",
    header: "pages.campaign.add.header",
    entityEditSchema: "campaign",
    permissionCheckPermission: "EDIT_CAMPAIGNS",
    permissionCheckLevel: "project",
    pageMenuType: "project",
    isnew,
  });
};

// Экспортируем компонент
export default EditPageContent
