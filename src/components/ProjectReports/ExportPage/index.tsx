import { Box, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import ReportsDateRange from "./ReportsDateRange";
import Reports from "./Reports";
import TypeSelector from "./TypeSelector";
import { useProjectReportPageContext } from "context/ProjectReportPageContext";
import { distinctUntilChanged } from "rxjs";
import { LoadingButton } from "@mui/lab";
import { ReportType } from "../types";
import MonthPicker from "./MonthPicker";

interface Props {}

const StyledGridItem = styled(Grid)({
  height: 37,
  display: "flex",
  alignItems: "flex-end",
});

const StyledSecondRowGridItem = styled(StyledGridItem)({
  marginTop: 27,
});

const StyledFieldHeader = styled(Typography)({
  letterSpacing: 0.44,
});

const StyledButtonWrapper = styled(Box)({
  textAlign: "right",
  paddingTop: 20,
});

/**
 * Компонент страницы таба экспорта на странице отчетов
 * @param param0
 * @returns
 */
const ExportPage: FC<Props> = ({}) => {
  const { t } = useTranslation();

  const {
    dateFrom,
    dateTo,
    reportType,
    selected,
    loadReportsFile,
    setDateFrom,
    setDateTo,
    generateReport,
  } = useProjectReportPageContext(
    distinctUntilChanged(
      (prev, curr) =>
        prev.dateFrom === curr.dateFrom &&
        prev.dateTo === curr.dateTo &&
        prev.reportType === curr.reportType &&
        prev.selected === curr.selected &&
        prev.loadReportsFile === curr.loadReportsFile
    )
  );

  const isReport =
    reportType === ReportType.reportRAO || reportType === ReportType.reportVOIS;

  return (
    <Box>
      <Grid container>
        <StyledGridItem item xs={4}>
          <StyledFieldHeader>{t("reports.field.chose-type")}</StyledFieldHeader>
        </StyledGridItem>
        <StyledGridItem item xs={8}>
          <TypeSelector />
        </StyledGridItem>
        <StyledSecondRowGridItem item xs={4}>
          <StyledFieldHeader>{t("reports.field.date")}</StyledFieldHeader>
        </StyledSecondRowGridItem>
        <StyledSecondRowGridItem item xs={8} sx={{ columnGap: 1.75 }}>
          {isReport && (
            <MonthPicker
              dateFrom={dateFrom}
              setDateFrom={setDateFrom}
              setDateTo={setDateTo}
            />
          )}
          {!isReport && (
            <ReportsDateRange
              dateFrom={dateFrom}
              dateTo={dateTo}
              setDateFrom={setDateFrom}
              setDateTo={setDateTo}
            />
          )}
        </StyledSecondRowGridItem>
        <Grid item xs={12} sx={{ mt: 11.25 }}>
          <Reports reportType={reportType} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <StyledButtonWrapper>
            <LoadingButton
              disabled={!selected.length}
              variant="outlined"
              onClick={generateReport}
              loading={loadReportsFile}
            >
              {t("reports.button.generate")}
            </LoadingButton>
          </StyledButtonWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(ExportPage);
