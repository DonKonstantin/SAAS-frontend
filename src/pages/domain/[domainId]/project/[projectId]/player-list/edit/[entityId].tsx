import React from "react";
import { NextPage } from "next";
import EditPage from "components/EditPage";

// Компонент страницы редактирования плеера
const EditPageContent: NextPage = () => {
  return <EditPage />;
};

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({ query }) => ({
  title: "player-list.edit.title",
  header: "player-list.edit.header",
  entityEditSchema: "player",
  entityEditPrimaryKey: query?.entityId as string,
  permissionCheckPermission: "EDIT_PLAYERS",
  permissionCheckLevel: "project",
  pageMenuType: "project",
});

// Экспортируем компонент
export default EditPageContent;
