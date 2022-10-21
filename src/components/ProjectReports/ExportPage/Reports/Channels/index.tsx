import { ReportProps } from "components/ProjectReports/types";
import React, { FC, memo } from "react";

/**
 * Компонент отчета по каналам
 * @param param0 
 * @returns 
 */
const Channels: FC<ReportProps> = ({ dateFrom, dateTo }) => {
  return (
    <>
      Channels
      {dateFrom.toDateString()}
      {dateTo.toDateString()}
    </>
  );
};

export default memo(Channels);
