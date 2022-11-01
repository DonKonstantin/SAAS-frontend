import React, { FC, memo } from 'react';
import { Grid } from "@mui/material";
import DaysGroupPicker from "../CommonComponents/DayChoosing/DaysGroupPicker";
import { useEntityEdit } from "../../../../context/EntityEditContext";
import { distinctUntilChanged } from "rxjs";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { RHFTextField } from "../../../hook-form";
import RHFRadioGroup from "../../../hook-form/RHFRadioGroup";
import RHFDropDown from "../../../hook-form/RHFDropDown";
import RHFDateField from "../../../hook-form/RHFDateField";


type Props = {
  watchTime: {
    // campaign_type: "simple" | "mute"
    // campaign_priority: "higher" | "background" | "low" | "normal" | "high"
    // campaign_play_type: "periodic" | "continuous"
    // campaign_days_type: "daily" | "daysOfTheWeek"
    campaign_type: string
    campaign_priority: string
    campaign_play_type: string
    campaign_days_type: string
  }
}

const CampaignSchedule: FC<Props> = ({ watchTime }) => {

  const { t } = useTranslation()

  const { entityData } = useEntityEdit(distinctUntilChanged())

  if (!entityData) {
    return null
  }

  const nameAndTypeCompany = [
    {
      name: t("pages.campaign.add.fields.name"),
      component: <RHFTextField
        name="name"
      />,
      size: { spacing: 4, xs: 2.5, sx: { mb: "16px" } }
    },
    {
      name: t("pages.campaign.add.fields.campaign_type"),
      component: <RHFRadioGroup
        name='campaign_type'
        options={['simple', "mute"]}
        getOptionLabel={
          [
            t("pages.campaign.edit.fields.campaign-type.simple"),
            t("pages.campaign.edit.fields.campaign-type.mute"),
          ]}
        sx={{ p: "0 9px" }}
      />,
      size: { spacing: 4, xs: 2.5, sx: { mb: entityData.values.campaign_type === "mute" ? "26.5px" : "36.5px" } }
    }
  ]

  let simpleCompanyOptions = [
    {
      name: t("pages.campaign.add.fields.timeQueue.timeQueue"),
      component: <Box sx={{ display: "flex", alignItems: "center" }}>
        <RHFTextField type='number' name='timeQueue'/>
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
      component: <RHFRadioGroup
        name='campaign_end_type'
        options={['finish', "break"]}
        getOptionLabel={
          [
            t("pages.campaign.edit.fields.campaign_end_type.finish"),
            t("pages.campaign.edit.fields.campaign_end_type.break")
          ]}
        sx={{ p: "0 9px" }}
      />,
      size: {
        container: { spacing: 4, sx: { mb: "32.5px" } },
        gridName: { xs: 2.5 },
        gridComponent: { xs: 9.5 },
      }
    },
    {
      name: t("pages.campaign.add.fields.campaign_priority"),
      component: <RHFDropDown name='campaign_priority' options={[
        { name: 'higher', label: t("pages.campaign.list.fields.campaign-priority-enum.higher") },
        { name: 'background', label: t("pages.campaign.list.fields.campaign-priority-enum.background") },
        { name: 'low', label: t("pages.campaign.list.fields.campaign-priority-enum.low") },
        { name: 'normal', label: t("pages.campaign.list.fields.campaign-priority-enum.normal") },
        { name: 'high', label: t("pages.campaign.list.fields.campaign-priority-enum.high") },
      ]}/>,
      size: {
        container: { spacing: 4, sx: { mb: "21px" } },
        gridName: { xs: 2.5 },
        gridComponent: { xs: 3 },
      }
    },
    {
      name: t("pages.campaign.add.fields.campaign_low_priority_end_type"),
      component: <RHFRadioGroup
        name='campaign_low_priority_end_type'
        options={['finish', "break"]}
        getOptionLabel={
          [
            t("pages.campaign.edit.fields.campaign_low_priority_end_type.finish"),
            t("pages.campaign.edit.fields.campaign_low_priority_end_type.break")
          ]}
        sx={{ p: "0 9px" }}
      />,
      size: {
        container: { spacing: 4, sx: { mb: "28.5px" } },
        gridName: { xs: 2.5 },
        gridComponent: { xs: 9.5 },
      }
    },
    {
      name: t("pages.campaign.add.fields.campaign_play_type"),
      component: <>
        <RHFRadioGroup
          name='campaign_play_type'
          options={['periodic', "continuous"]}
          getOptionLabel={
            [
              t("pages.campaign.edit.fields.campaign_play_type.periodic"),
              t("pages.campaign.edit.fields.campaign_play_type.continuous")
            ]}
          sx={{ p: "0 9px" }}
        />
        {watchTime.campaign_play_type === "periodic" &&
            <Grid container alignItems="flex-start" spacing={2} sx={{ pt: "30px" }}>
                <Grid item xs={1}>
                    <RHFTextField type='number' name='campaign_play_tracks_quantity'/>
                </Grid>
                <Grid item xs='auto' alignSelf='flex-end'>
                    Трека каждые:
                </Grid>
                <Grid item xs={1}>
                    <RHFTextField type='number' name='campaign_play_tracks_period_value'/>
                </Grid>
                <Grid item xs={1}>
                    <RHFDropDown name='campaign_play_tracks_period_type' options={
                      [
                        {
                          name: 'hours',
                          label: t("pages.campaign.edit.fields.campaign_play_tracks_period_type.hours")
                        },
                        {
                          name: 'minutes',
                          label: t("pages.campaign.edit.fields.campaign_play_tracks_period_type.minutes")
                        },
                      ]}/>
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

  if (watchTime.campaign_priority === 'background') {
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
        watchTime.campaign_type === "simple"
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
          <RHFDateField name='campaign_period_start'/>
        </Grid>
        <Grid item xs={1.5}>
          <RHFDateField name='campaign_period_stop'/>
        </Grid>
      </Grid>

      <Grid container spacing={4} alignItems="flex-start">
        <DaysGroupPicker
          nameRadioButton="campaign_days_type"
          nameFieldDays="days"
          watchNameRadioButton={watchTime.campaign_days_type}
        />
      </Grid>

    </Grid>

  )
}

export default memo(CampaignSchedule)