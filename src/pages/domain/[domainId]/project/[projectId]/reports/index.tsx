import React from "react";
import { NextPage } from "next";
import { ProjectReports } from "components/ProjectReports";

// Компонент страницы отчетов уровня компании
const ProjectReportsPage: NextPage = () => {
  return <ProjectReports />;
};

// Экспортируем основные параметры страницы
ProjectReportsPage.getInitialProps = async () => ({
  title: "objects-passport-list.title",
  header: "objects-passport-list.header",
  permissionCheckPermission: "READ_REPORTS",
  permissionCheckEditPermission: "READ_REPORTS",
  permissionCheckCreatePermission: "READ_REPORTS",
  permissionCheckDeletePermission: "READ_REPORTS",
  permissionCheckLevel: "project",
  pageMenuType: "project",
});

export default ProjectReportsPage;
