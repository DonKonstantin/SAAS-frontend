import { ReportProps } from "components/ProjectReports/types";
import { useProjectReportPageContext } from "context/ProjectReportPageContext";
import React, {FC, memo, useState} from "react";
import ReportsTable from "../../ReportsTable";
import {TextField} from "@mui/material";

// const headers = [
//   {
//     title: "reports.preview-table.logs.header.name"
//   },
//   {
//     title: "reports.preview-table.logs.header.number-of-plays"
//   },
// ];

export interface PlayerLogsListType {
  id: string;
  name: string;
  played: number;
};

/**
 * Компонент отчета с логами плеера
 * @param param0 
 * @returns 
 */
const PlayerLogs: FC<ReportProps> = () => {
  const { reportsList } = useProjectReportPageContext();

  const [checked, setChecked] = useState<string[]>([]);

  const tableData = reportsList.map((item: PlayerLogsListType) => {
    return {
      primaryKey: item.id,
      cells: [item.name, item.played],
    };
  });

  return (
    <>
      <ReportsTable headers={headers} rows={tableData} onSelect={setChecked}/>
    </>
  );
};

export default memo(PlayerLogs);
