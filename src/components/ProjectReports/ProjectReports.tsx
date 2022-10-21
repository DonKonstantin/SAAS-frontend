import React, { memo, useState } from "react";
import { Box, Paper, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Breadcrumbs from "components/Breadcrumbs";
import { NextPage } from "next";
import { PageWithChangeableMenu } from "layouts/MenuChangeLayout";
import { PageWithMetaTags } from "components/UILayer/PageWithMetaTags";
import { TabsTypes } from "./types";
import { useTranslation } from "react-i18next";
import ExportPage from "./ExportPage";
import ImportPage from "./ImportPage";
import { styled } from "@mui/system";
import ProjectReportPageContextInitializer from "context/ProjectReportPageContext/ProjectReportPageContextInitializer";

type Props = PageWithMetaTags & PageWithChangeableMenu;

const StyledTabWrapper = styled(Box)({
  borderBottom: 1,
  borderColor: "divider",
});

const StyledContentWrapper = styled(Paper)({
  marginTop: 13,
  padding: "20px 40px",
});

const StyledTabPanel = styled(TabPanel)({
  padding: 0,
});

/**
 * Компонент страницы отчетов
 * @param param0
 * @returns
 */
const ProjectReports: NextPage<Props> = ({}) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<TabsTypes>("export");

  const onTabChangeHandler = (_: any, newValue: TabsTypes) => {
    setValue(newValue);
  };

  return (
    <ProjectReportPageContextInitializer>
      <Box sx={{ pb: 3.5 }}>
        <Breadcrumbs />
      </Box>
      <TabContext value={value}>
        <StyledTabWrapper>
          <TabList onChange={onTabChangeHandler}>
            <Tab label={t("reports.tab.export")} value="export" />
            <Tab label={t("reports.tab.import")} value="import" />
          </TabList>
        </StyledTabWrapper>
        <StyledContentWrapper elevation={3}>
          <StyledTabPanel value="export">
            <ExportPage />
          </StyledTabPanel>
          <StyledTabPanel value="import">
            <ImportPage />
          </StyledTabPanel>
        </StyledContentWrapper>
      </TabContext>
    </ProjectReportPageContextInitializer>
  );
};

export default memo(ProjectReports);
