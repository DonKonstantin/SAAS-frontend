import { ReportType } from "components/ProjectReports/types";
import React, { FC, memo } from "react";
import ReportsTable from "../ReportsTable";

/**
 * Компонент выводит страницу выбранного отчета
 * @param props
 * @returns
 */
const Reports: FC<{ reportType: ReportType | undefined }> = ({
  reportType,
}) => {
  if (!reportType) {
    return null;
  }

  if (reportType === ReportType.files) {
    return <ReportsTable multiselected={false} />;
  }

  return <ReportsTable multiselected={true} />;
};

export default memo(Reports);
