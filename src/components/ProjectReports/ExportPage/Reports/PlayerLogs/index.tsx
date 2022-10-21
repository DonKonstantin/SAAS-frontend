import { ReportProps } from "components/ProjectReports/types";
import React, { FC, memo } from "react";

/**
 * Компонент отчета с логами плеера
 * @param param0 
 * @returns 
 */
const PlayerLogs: FC<ReportProps> = ({ dateFrom, dateTo }) => {
  return (
    <>
      PlayerLogs
      {dateFrom.toDateString()}
      {dateTo.toDateString()}
    </>
  );
};

export default memo(PlayerLogs);
