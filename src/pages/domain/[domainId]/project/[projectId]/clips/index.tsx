import React from 'react';
import { NextPage } from "next";
import { PageWithEntityList } from "../../../../../../components/ListPage/types";
import { CampaignClipsListPage } from 'components/CampaignClipsListPage';

// Компонент страницы клипов проекта
const ListingPage: NextPage<{ projectId: string }> = ({ projectId }) => {
  return (
    <CampaignClipsListPage projectId={projectId} />
  );
};

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async ({ query }): Promise<PageWithEntityList<{ projectId: string }>> => ({
  title: "campaign-clips-list.list.title",
  header: "campaign-clips-list.list.header",
  permissionCheckPermission: "READ_CAMPAIGNS",
  permissionCheckCreatePermission: "EDIT_CAMPAIGNS",
  permissionCheckEditPermission: "EDIT_CAMPAIGNS",
  permissionCheckDeletePermission: "EDIT_CAMPAIGNS",
  pageMenuType: "project",
  permissionCheckLevel: "project",
  projectId: query.projectId as string,
});

export default ListingPage;
