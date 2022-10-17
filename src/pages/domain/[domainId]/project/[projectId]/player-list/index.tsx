import React from "react";
import { NextPage } from "next";
import ListPage from "components/ListPage";

// Компонент страницы листинга плееров
const ListingPage: NextPage = () => {
  return <ListPage />;
};

// Экспортируем основные параметры страницы
ListingPage.getInitialProps = async ({ query }) => ({
  title: "player-list.title",
  header: "player-list.header",
  entityListSchema: "player",
  permissionCheckPermission: "READ_PLAYERS",
  permissionCheckEditPermission: "EDIT_PLAYERS",
  permissionCheckDeletePermission: "EDIT_PLAYERS",
  permissionCheckLevel: "project",
  entityListAdditionFilter: { project_id: `{ _equals: ${query.projectId}}` },
  pageMenuType: "project",
});

// Экспортируем компонент
export default ListingPage;
