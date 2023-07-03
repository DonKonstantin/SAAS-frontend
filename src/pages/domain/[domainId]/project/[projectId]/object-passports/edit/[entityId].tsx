import React from "react";
import { NextPage } from "next";
import EditPage from "components/EditPage";

// Компонент страницы редактирования
const EditPageContent: NextPage = () => {
  return <EditPage />;
};

// Экспортируем основные параметры страницы
EditPageContent.getInitialProps = async ({ query }) => ({
  title: "objects-passport-list.edit.title",
  header: "objects-passport-list.edit.header",
  entityEditSchema: "object_passport",
  entityEditPrimaryKey: query?.entityId as string,
  permissionCheckPermission: "EDIT_OBJECT_PASSPORTS",
  permissionCheckLevel: "project",
  pageMenuType: "project",
});

// Экспортируем компонент
export default EditPageContent;
