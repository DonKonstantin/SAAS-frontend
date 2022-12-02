import { ReportProps } from "components/ProjectReports/types";
import React, { FC, memo } from "react";

/**
 * Компонент отчета VOIS
 * @param param0 
 * @returns 
 */
const ReportVOIS: FC<ReportProps> = ({ dateFrom, dateTo }) => {
  return (
    <>
      ReportVOIS
      {dateFrom.toDateString()}
      {dateTo.toDateString()}
    </>
  );
};

export default memo(ReportVOIS);
