import { ReportProps } from "components/ProjectReports/types";
import { useProjectReportPageContext } from "context/ProjectReportPageContext";
import React, {FC, memo, useState} from "react";
import ReportsTable from "../../ReportsTable";
import {Box, Button, Divider, TextField} from "@mui/material";
import {styled} from "@mui/system";
import {useTranslation} from "react-i18next";

// const headers = [
//   {
//     title: "reports.preview-table.logs.header.name"
//   },
//   {
//     title: "reports.preview-table.logs.header.number-of-plays"
//   },
// ];

const StyledButtonWrapper = styled(Box)({
  textAlign: "right",
  paddingTop: 20,
});

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
  const { t } = useTranslation();

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
      <Divider />
      <StyledButtonWrapper>
        <Button variant="outlined" onClick={console.log}>{t("reports.button.generate")}</Button>
      </StyledButtonWrapper>
    </>
  );
};

export default memo(PlayerLogs);
