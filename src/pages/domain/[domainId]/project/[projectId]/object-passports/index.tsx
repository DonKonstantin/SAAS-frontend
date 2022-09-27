import React from "react";
import { NextPage } from "next";
import ListPage from "components/ListPage";
import { PageWithEntityList } from "components/ListPage/types";

// Компонент листинга паспортов обектов уровня проекта
const ObjectsPassportListingPage: NextPage = () => {
  return <ListPage />;
};

// Экспортируем основные параметры страницы
ObjectsPassportListingPage.getInitialProps = async ({
  query,
}): Promise<PageWithEntityList> => ({
  title: "objects-passport-list.title",
  header: "objects-passport-list.header",
  entityListSchema: "object_passport",
  permissionCheckPermission: "READ_OBJECT_PASSPORT",
  permissionCheckEditPermission: "EDIT_OBJECT_PASSPORTS",
  permissionCheckCreatePermission: "CREATE_OBJECT_PASSPORT",
  permissionCheckDeletePermission: "DELETE_OBJECT_PASSPORT",
  permissionCheckLevel: "project",
  pageMenuType: "project",
  entityListAdditionFilter: { project_id: `{_equals: ${query.projectId}}` },
});

// Экспортируем компонент
export default ObjectsPassportListingPage;
