import React, { FC, useState } from "react";
import { EditFormGroupProperties } from "../../../../settings/pages/system/edit";
import { useEntityEdit } from "../../../../context/EntityEditContext";
import { distinctUntilChanged } from "rxjs";
import { Button, Grid, Paper, Tab } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CampaignSchedule from "./CampaignSchedule";
import { useTranslation } from "react-i18next";

const optionsForTabs = [
  { id: "schedule", name: "Расписание" },
  { id: "content", name: 'Контент' },
  { id: "channels", name: "Каналы" }
]

// Компонент вывода группы создания компании
const CampaignInfoGroup: FC<EditFormGroupProperties> = ({ config }) => {

  const { isVisible = () => true } = config
  const { entityData } = useEntityEdit(distinctUntilChanged())
  if (!entityData) {
    return null
  }

  const { t } = useTranslation()

  const { values } = entityData
  if (!isVisible(values)) {
    return null
  }

  const onSubmit = () => {
    console.log(values)
  }

  //Выбор контетной табы
  const [currentActionTab, setCurrentActionTab] = useState<string>("schedule");

  const changeCurrentTab = (_event: React.SyntheticEvent, newValue: any) => {
    setCurrentActionTab(newValue);
  };

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <TabContext value={currentActionTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#F5F5F5", mb: "13px" }}>
              <TabList
                onChange={changeCurrentTab}
                aria-label={'campaign-create'}
              >
                {
                  optionsForTabs.map(permission =>
                    <Tab
                      sx={{ minHeight: "51px", minWidth: '168px' }}
                      label={permission.name}
                      value={permission.id}
                      key={permission.id}
                    />
                  )
                }
              </TabList>
            </Box>
            <Paper sx={{ width: '100%', p: "30px 40px" }}>
              {
                optionsForTabs.map(permission => {

                  if (permission.id === 'schedule') {
                    return (
                      <TabPanel value={permission.id} key={permission.id} sx={{ p: 0 }}>
                        <CampaignSchedule/>
                      </TabPanel>
                    )
                  }
                })
              }
              <Stack direction='row' justifyContent='flex-end'>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ m: "18px 21px 18px 0" }}
                  onClick={onSubmit}
                >
                  {t("pages.campaign.add.buttons.save")}
                </Button>
              </Stack>
            </Paper>
          </TabContext>
        </Box>
      </Grid>
    </>
  )
}

// Экспортируем компонент
export default CampaignInfoGroup