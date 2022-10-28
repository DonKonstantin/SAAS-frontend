import React, { FC, useState } from "react";
import { EditFormGroupProperties } from "../../../../settings/pages/system/edit";
import { useEntityEdit } from "../../../../context/EntityEditContext";
import { distinctUntilChanged } from "rxjs";
import { Button, Grid, Paper, Tab } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CampaignSchedule from "./CampaignSchedule";
import { useTranslation } from "react-i18next";
import { Channels } from "../Channels";

enum optionsForTabs {
  "schedule" = "schedule",
  "content" = "content",
  "channels" = "channels",
}

// Компонент вывода группы создания компании
const CampaignInfoGroup: FC<EditFormGroupProperties> = ({ config }) => {
  const { isVisible = () => true } = config;
  const { entityData } = useEntityEdit(distinctUntilChanged());
  if (!entityData) {
    return null;
  }

  const { t } = useTranslation();

  const { values } = entityData;
  if (!isVisible(values)) {
    return null;
  }

  const onSubmit = () => {
    console.log(values);
  };

  //Выбор контетной табы
  const [currentActionTab, setCurrentActionTab] = useState<string>("schedule");

  const changeCurrentTab = (_event: React.SyntheticEvent, newValue: any) => {
    setCurrentActionTab(newValue);
  };

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <TabContext value={currentActionTab}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "#F5F5F5",
                mb: "13px",
              }}
            >
              <TabList
                onChange={changeCurrentTab}
                aria-label={"campaign-create"}
              >
                {Object.keys(optionsForTabs).map((permission) => (
                  <Tab
                    sx={{ minHeight: "51px", minWidth: "168px" }}
                    label={t(`pages.campaign.edit.tabs.${permission}`)}
                    value={permission}
                    key={permission}
                  />
                ))}
              </TabList>
            </Box>
            <Paper sx={{ width: "100%", p: "30px 40px" }}>
              <TabPanel
                value={optionsForTabs.schedule}
                key={optionsForTabs.schedule}
                sx={{ p: 0 }}
              >
                <CampaignSchedule />
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ m: "18px 21px 18px 0" }}
                    onClick={onSubmit}
                  >
                    {t("pages.campaign.add.buttons.save")}
                  </Button>
                </Stack>
              </TabPanel>
              <TabPanel
                value={optionsForTabs.channels}
                key={optionsForTabs.channels}
                sx={{ p: 0 }}
              >
                <Channels/>
              </TabPanel>
            </Paper>
          </TabContext>
        </Box>
      </Grid>
    </>
  );
};

// Экспортируем компонент
export default CampaignInfoGroup;
