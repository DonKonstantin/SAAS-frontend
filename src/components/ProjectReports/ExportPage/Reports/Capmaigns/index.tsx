import { ReportProps } from "components/ProjectReports/types";
import React, { FC, memo } from "react";

/**
 * Компонент отчета по кампаниям
 * @param param0 
 * @returns 
 */
const Capmaigns: FC<ReportProps> = ({ dateFrom, dateTo }) => {
  return (
    <>
      Capmaigns
      {dateFrom.toDateString()}
      {dateTo.toDateString()}
    </>
  );
};

export default memo(Capmaigns);
