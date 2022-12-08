import { ReportProps } from "components/ProjectReports/types";
import React, {FC, memo} from "react";
import {Box, Button, Divider} from "@mui/material";
import {styled} from "@mui/system";
import {useTranslation} from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <>
      <Divider />
      <StyledButtonWrapper>
        <Button variant="outlined" onClick={console.log}>{t("reports.button.generate")}</Button>
      </StyledButtonWrapper>
    </>
  );
};

export default memo(PlayerLogs);
