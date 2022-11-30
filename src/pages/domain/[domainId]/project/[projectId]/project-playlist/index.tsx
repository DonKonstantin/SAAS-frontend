import React from "react";
import { NextPage } from "next";
import ListPage from "components/ListPage";
import { PageWithEntityList } from "components/ListPage/types";

// Компонент листинга плэйлистов уровня проекта
const PlaylistListingPage: NextPage = () => {
  return <ListPage />;
};

// Экспортируем основные параметры страницы
PlaylistListingPage.getInitialProps = async ({
  query,
}): Promise<PageWithEntityList> => ({
  title: "project-playlists.title",
  header: "project-playlists.header",
  entityListSchema: "project_playlist",
  permissionCheckPermission: "READ_PROJECT_PLAYLISTS",
  permissionCheckEditPermission: "EDIT_PROJECT_PLAYLISTS",
  permissionCheckDeletePermission: "EDIT_PROJECT_PLAYLISTS",
  permissionCheckLevel: "project",
  pageMenuType: "project",
  entityListAdditionFilter: { project_id: `{_equals: ${query.projectId}}` },
});

// Экспортируем компонент
export default PlaylistListingPage;
