import { ReportProps } from "components/ProjectReports/types";
import React, { FC, memo } from "react";

/**
 * Компонент отчета по устройству
 * @param param0 
 * @returns 
 */
const DeviceReport: FC<ReportProps> = ({ dateFrom, dateTo }) => {
  return (
    <>
      DeviceReport
      {dateFrom.toDateString()}
      {dateTo.toDateString()}
    </>
  );
};

export default memo(DeviceReport);
