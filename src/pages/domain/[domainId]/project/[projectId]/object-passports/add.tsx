import React from "react";
import { NextPage } from "next";
import EditPage from "components/EditPage";
import { PageWithEntityEdit } from "components/EditPage/type";

// Компонент редактирования паспорта объекта
const ObjectsPassportAddingPage: NextPage = () => {
  return <EditPage />;
};

// Экспортируем основные параметры страницы
ObjectsPassportAddingPage.getInitialProps =
  async (): Promise<PageWithEntityEdit> => ({
    title: "objects-passport-list.add.title",
    header: "objects-passport-list.add.header",
    entityEditSchema: "object_passport",
    permissionCheckPermission: "CREATE_OBJECT_PASSPORT",
    permissionCheckLevel: "project",
    pageMenuType: "project",
  });

// Экспортируем компонент
export default ObjectsPassportAddingPage;
