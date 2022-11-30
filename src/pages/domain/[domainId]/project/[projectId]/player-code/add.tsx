import React from "react";
import { NextPage } from "next";
import EditPage from "components/EditPage";
import { PageWithEntityEdit } from "components/EditPage/type";

// Компонент добавления кода плеера
const PlayerCodesAddingPage: NextPage = () => {
  return <EditPage />;
};

// Экспортируем основные параметры страницы
PlayerCodesAddingPage.getInitialProps =
  async (): Promise<PageWithEntityEdit> => ({
    title: "player-codes.add.title",
    header: "player-codes.add.header",
    entityEditSchema: "player_code",
    permissionCheckPermission: "EDIT_PLAYER_CODES",
    permissionCheckLevel: "project",
    pageMenuType: "project",
  });

// Экспортируем компонент
export default PlayerCodesAddingPage;
