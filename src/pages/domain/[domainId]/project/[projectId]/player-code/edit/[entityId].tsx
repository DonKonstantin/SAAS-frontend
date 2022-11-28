import React from "react";
import { NextPage } from "next";
import EditPage from "components/EditPage";
import { PageWithEntityEdit } from "components/EditPage/type";

// Компонент страницы редактирования кода плеера
const EditPlayerCodePage: NextPage = () => {
  return <EditPage />;
};

// Экспортируем основные параметры страницы
EditPlayerCodePage.getInitialProps = async ({
  query,
}): Promise<PageWithEntityEdit> => ({
  title: "player-codes.edit.title",
  header: "player-codes.edit.header",
  entityEditSchema: "player_code",
  entityEditPrimaryKey: query?.entityId as string,
  permissionCheckPermission: "EDIT_PLAYER_CODES",
  permissionCheckLevel: "project",
  pageMenuType: "project",
});

// Экспортируем компонент
export default EditPlayerCodePage;
