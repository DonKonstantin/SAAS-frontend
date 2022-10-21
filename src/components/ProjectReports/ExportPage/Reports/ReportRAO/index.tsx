import { ReportProps } from "components/ProjectReports/types";
import React, { FC, memo } from "react";

/**
 * Компонент отчета RAO
 * @param param0 
 * @returns 
 */
const ReportRAO: FC<ReportProps> = ({ dateFrom, dateTo }) => {
  return (
    <>
      ReportRAO
      {dateFrom.toDateString()}
      {dateTo.toDateString()}
    </>
  );
};

export default memo(ReportRAO);
