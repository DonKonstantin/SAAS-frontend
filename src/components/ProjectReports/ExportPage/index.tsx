import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import ReportsDateRange from "./ReportsDateRange";
import Reports from "./Reports";
import TypeSelector from "./TypeSelector";
import { useProjectReportPageContext } from "context/ProjectReportPageContext";
import { distinctUntilChanged } from "rxjs";

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

/**
 * Компонент страницы таба экспорта на странице отчетов
 * @param param0
 * @returns
 */
const ExportPage: FC<Props> = ({}) => {
  const { t } = useTranslation();

  const { dateFrom, dateTo, reportType, setDateFrom, setDateTo, setReportType, generateReport } = useProjectReportPageContext(
    distinctUntilChanged((prev, curr) => 
      prev.dateFrom.getTime() === curr.dateFrom.getTime() &&
      prev.dateTo.getTime() === curr.dateTo.getTime() &&
      prev.reportType === curr.reportType
    )
  );

  return (
    <Box>
      <Grid container>
        <StyledGridItem item xs={4}>
          <StyledFieldHeader>{t("reports.field.chose-type")}</StyledFieldHeader>
        </StyledGridItem>
        <StyledGridItem item xs={8}>
          <TypeSelector selected={reportType} setSelected={setReportType} />
        </StyledGridItem>
        <StyledSecondRowGridItem xs={4}>
          <StyledFieldHeader>{t("reports.field.date")}</StyledFieldHeader>
        </StyledSecondRowGridItem>
        <StyledSecondRowGridItem item xs={8} sx={{ columnGap: 1.75 }}>
          <ReportsDateRange
            dateFrom={dateFrom}
            dateTo={dateTo}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
          />
        </StyledSecondRowGridItem>
        <Grid item xs={12} sx={{ mt: 11.25 }}>
          <Reports
            reportType={reportType}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(ExportPage);
