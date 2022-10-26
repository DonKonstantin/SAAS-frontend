import React, { memo } from 'react';
import { Grid } from "@mui/material";
import StringField from "../../../EditPage/Fields/StringField";
import QueueIntField from "../../../EditPage/Fields/QueueIntField";
import EnumField from "../../../EditPage/Fields/EnumField";
import IntField from "../../../EditPage/Fields/IntField";
import DateField from "../../../EditPage/Fields/DateField";
import CampaignDaysGroup from "./CampaignDaysGroup";
import RadioEnumButton from "../../../EditPage/Fields/RadioEnumButton";
import { useEntityEdit } from "../../../../context/EntityEditContext";
import { distinctUntilChanged } from "rxjs";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";

const CampaignSchedule = () => {

  const { entityData } = useEntityEdit(distinctUntilChanged())
  if (!entityData) {
    return null
  }

  const { t } = useTranslation()

  const nameAndTypeCompany = [
    {
      name: t("pages.campaign.add.fields.name"),
      component: <StringField fieldCode='name'/>,
      size: { spacing: 4, xs: 2.5, sx: { mb: "16px" } }
    },
    {
      name: t("pages.campaign.add.fields.campaign_type"),
      component: <RadioEnumButton fieldCode='campaign_type'/>,
      size: { spacing: 4, xs: 2.5, sx: { mb: entityData.values.campaign_type === "mute" ? "26.5px" : "36.5px" } }
    }
  ]

  let simpleCompanyOptions = [
    {
      name: t("pages.campaign.add.fields.timeQueue.timeQueue"),
      component: <Box sx={{ display: "flex", alignItems: "center" }}>
        <QueueIntField fieldCode='timeQueue'/>
        <Box sx={{ pl: "11px" }}>({t("pages.campaign.add.fields.timeQueue.seconds")})</Box>
      </Box>,
      size: {
        container: { spacing: 4, sx: { mb: "22.5px" } },
        gridName: { xs: 2.5 },
        gridComponent: { xs: 2.5 },
      }
    },
    {
      name: t("pages.campaign.add.fields.campaign_end_type"),
      component: <RadioEnumButton fieldCode='campaign_end_type'/>,
      size: {
        container: { spacing: 4, sx: { mb: "32.5px" } },
        gridName: { xs: 2.5 },
        gridComponent: { xs: 9.5 },
      }
    },
    {
      name: t("pages.campaign.add.fields.campaign_priority"),
      component: <EnumField fieldCode='campaign_priority'/>,
      size: {
        container: { spacing: 4, sx: { mb: "21px" } },
        gridName: { xs: 2.5 },
        gridComponent: { xs: 3 },
      }
    },
    {
      name: t("pages.campaign.add.fields.campaign_low_priority_end_type"),
      component: <RadioEnumButton fieldCode='campaign_low_priority_end_type'/>,
      size: {
        container: { spacing: 4, sx: { mb: "28.5px" } },
        gridName: { xs: 2.5 },
        gridComponent: { xs: 9.5 },
      }
    },
    {
      name: t("pages.campaign.add.fields.campaign_play_type"),
      component: <>
        <RadioEnumButton fieldCode='campaign_play_type'/>
        {entityData.values.campaign_play_type === "periodic" &&
            <Grid container alignItems="flex-start" spacing={2} sx={{ pt: "30px" }}>
                <Grid item xs={1}>
                    <IntField fieldCode='campaign_play_tracks_quantity'/>
                </Grid>
                <Grid item xs='auto'>
                    Трека каждые:
                </Grid>
                <Grid item xs={1}>
                    <IntField fieldCode='campaign_play_tracks_period_value'/>
                </Grid>
                <Grid item xs={1}>
                    <EnumField fieldCode='campaign_play_tracks_period_type'/>
                </Grid>
            </Grid>
        }
      </>,
      size: {
        container: { spacing: 4, sx: { mb: "44px" } },
        gridName: { xs: 2.5 },
        gridComponent: { xs: 9.5 },
      }
    },
  ]

  if (entityData.values.campaign_priority === 'background') {
    simpleCompanyOptions = simpleCompanyOptions.filter(field => field.name !== t("pages.campaign.add.fields.campaign_low_priority_end_type"))
  }

  return (
    <Grid container>

      {
        nameAndTypeCompany.map(field => (
          <Grid container spacing={field.size.spacing} sx={field.size.sx} alignItems="center" key={field.name}>
            <Grid item xs={field.size.xs}>
              {field.name}
            </Grid>

            <Grid item>
              {field.component}
            </Grid>
          </Grid>
        ))
      }

      {
        entityData.values.campaign_type === "simple"
        &&
        simpleCompanyOptions.map(field => (
          <Grid container {...field.size.container} alignItems="flex-start" key={field.name}>
            <Grid item {...field.size.gridName}>
              {field.name}
            </Grid>

            <Grid item {...field.size.gridComponent}>
              {field.component}
            </Grid>
          </Grid>
        ))
      }

      <Grid container spacing={4} sx={{ mb: "23px" }} alignItems="flex-start">
        <Grid item xs={2.5}>
          {t("pages.campaign.add.fields.campaign_period")}
        </Grid>
        <Grid item xs={1.5}>
          <DateField fieldCode='campaign_period_start'/>
        </Grid>
        <Grid item xs={1.5}>
          <DateField fieldCode='campaign_period_stop'/>
        </Grid>
      </Grid>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={2.5}>
          {t("pages.campaign.add.fields.campaign_days.title")}
        </Grid>
        <Grid item xs={4}>
          <RadioEnumButton fieldCode='campaign_days_type'/>
          <CampaignDaysGroup fieldCode='days' valuesData={entityData.values.campaign_days_type as string}/>
        </Grid>
      </Grid>
    </Grid>

  )
}

export default memo(CampaignSchedule)