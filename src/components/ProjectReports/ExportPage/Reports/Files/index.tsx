import { ReportProps } from "components/ProjectReports/types";
import React, { FC, memo } from "react";

/**
 * Компонент отчета по файлам
 * @param param0 
 * @returns 
 */
const Files: FC<ReportProps> = ({ dateFrom, dateTo }) => {
  return (
    <>
      Files
      {dateFrom.toDateString()}
      {dateTo.toDateString()}
    </>
  );
};

export default memo(Files);
