import React from "react";
import { NextPage } from "next";
import ListPage from "components/ListPage";
import { PageWithEntityList } from "components/ListPage/types";

// Компонент листинга кодов плееров
const ObjectsPassportListingPage: NextPage = () => {
  return <ListPage />;
};

// Экспортируем основные параметры страницы
ObjectsPassportListingPage.getInitialProps = async ({
  query,
}): Promise<PageWithEntityList> => ({
  title: "player-codes.list.title",
  header: "player-codes.list.header",
  entityListSchema: "player_code",
  permissionCheckPermission: "EDIT_PLAYER_CODES",
  permissionCheckEditPermission: "EDIT_PLAYER_CODES",
  permissionCheckCreatePermission: "EDIT_PLAYER_CODES",
  permissionCheckDeletePermission: "EDIT_PLAYER_CODES",
  permissionCheckLevel: "project",
  pageMenuType: "project",
  entityListAdditionFilter: { project_id: `{_equals: ${query.projectId}}` },
});

// Экспортируем компонент
export default ObjectsPassportListingPage;
