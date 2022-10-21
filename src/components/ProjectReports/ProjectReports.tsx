import React, { memo, useState } from "react";
import { Box, Paper, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Breadcrumbs from "components/Breadcrumbs";
import { NextPage } from "next";
import { PageWithChangeableMenu } from "layouts/MenuChangeLayout";
import { PageWithMetaTags } from "components/UILayer/PageWithMetaTags";
import { TabsTypes } from "./types";
import { useTranslation } from "react-i18next";

type Props = PageWithMetaTags & PageWithChangeableMenu;

const ProjectReports: NextPage<Props> = ({}) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<TabsTypes>("export");

  const onTabChangeHandler = (_: any, newValue: TabsTypes) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Breadcrumbs />
      </Box>
      <Paper elevation={3}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={onTabChangeHandler}>
              <Tab label={t("reports.tabs.export")} value="export" />
              <Tab label={t("reports.tabs.import")} value="import" />
            </TabList>
          </Box>
          <TabPanel value="export">Item One</TabPanel>
          <TabPanel value="import">Item Two</TabPanel>
        </TabContext>
      </Paper>
    </>
  );
};

export default memo(ProjectReports);
