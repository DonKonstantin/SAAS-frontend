import {yupResolver} from "@hookform/resolvers/yup";
import {Grid} from "@mui/material";
import {FormProvider, RHFDateField} from "components/hook-form";
import {useCampaignPlaylistEditContext} from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import React, {FC, memo, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import DaysGroupPicker from "../../CommonComponents/DayChoosing/DaysGroupPicker";
import * as Yup from "yup";
import {CampaignDaysType, CampaignPlaylistConnect,} from "services/campaignListService/types";
import {styled} from "@mui/system";
import {LoadingButton} from "@mui/lab";
import {distinctUntilChanged, distinctUntilKeyChanged} from "rxjs";
import dayjs from "dayjs";
import RHFRadioGroup from "../../../../hook-form/RHFRadioGroup";
import {useCampaignEditContext} from "../../../../../context/CampaignEditContext/useCampaignEditContext";
import {isEqual} from "lodash";
import {daysName} from "../../CampaignInfoGroup";
import { CampaignDay } from "services/projectPlaylistService/interfaces";

interface Props {
  storePlaylist: (playlist: CampaignPlaylistConnect) => void;

  onSubmitCampaign(): void
}

interface CampaignPlaylistEditFormFieldsType {
  days: CampaignDay[];
  campaign_days_type: CampaignDaysType;
  isCampaignTimetable: string
}

const StyledButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  borderTop: "1px solid #E0E0E0",
  marginTop: 68,
});

/**
 * Компонент вкладки редактирования расписания плэйлиста
 * @param param0
 * @returns
 */
const Schedule: FC<Props> = ({ storePlaylist, onSubmitCampaign }) => {
  const { t } = useTranslation();

  const { playlist } = useCampaignPlaylistEditContext(
    distinctUntilKeyChanged("playlist")
  );

  const { campaign } = useCampaignEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        isEqual(prev.campaign, curr.campaign)
    )
  );

  const [disableForm, setDisableForm] = useState<boolean>(false);

  const RegisterScheme = Yup.object().shape({
    isCampaignTimetable: Yup.boolean(),
    periodStart: Yup.date()
      .when("isCampaignTimetable", {
        is: false,
        then: Yup.date()
          .required(t("pages.campaign.edit.errors.required"))
          .nullable()
          .test('test_day_start_type', t("pages.campaign.edit.errors.date.check-date"), async (value) => dayjs(value).isValid())
          .typeError(t("pages.campaign.edit.errors.date.check-date")),
      }),
    periodStop: Yup.date()
      .when("isCampaignTimetable", {
        is: false,
        then: Yup.date()
          .required(t("pages.campaign.edit.errors.required"))
          .nullable()
          .min(
            Yup.ref("periodStart"),
            t("pages.campaign.edit.errors.date.minDate")
          )
          .test('test_day_stop_type', t("pages.campaign.edit.errors.date.check-date"), async (value) => dayjs(value).isValid())
          .typeError(t("pages.campaign.edit.errors.date.check-date")),
      })
  });

  if (!playlist) {
    return null;
  }

  let defaultValues = {
    days: playlist.days.length
      ? playlist.days.map((day) => ({
        id: day.id,
        day_num: day.dayNum,
        is_active: day.isActive,
        days_start_minutes: day.daysStartMinutes,
        days_stop_minutes: day.daysStopMinutes,
      }))
      : Object.keys(daysName)
        .map((_, index) => ({
          day_num: index + 1,
          is_active: true,
          days_start_minutes: 0,
          days_stop_minutes: 1439,
        })),
    campaign_days_type: "daily" as CampaignDaysType,
    periodStart: playlist.periodStart ?? null,
    periodStop: playlist.periodStop ?? null,
    isCampaignTimetable: String(playlist.isCampaignTimetable)
  };

  const methods = useForm<CampaignPlaylistEditFormFieldsType>({
    resolver: yupResolver(RegisterScheme),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const watchSelectedType = watch("campaign_days_type");
  const watchIsCampaignTimetable = watch("isCampaignTimetable");

  const onSubmit = (data: CampaignPlaylistEditFormFieldsType) => {

    if (Object.keys(errors).length) {
      return;
    }

    if (!playlist || !campaign) {
      return;
    }
    let preparedPlaylist;

    if (watchIsCampaignTimetable === "true") {
      preparedPlaylist = {
        ...playlist,
        ...data,
        isCampaignTimetable: true,
        days: campaign.days.map(day => {
          delete day['campaign_id']
          return {
            id: day.id,
            dayNum: day.day_num,
            isActive: day.is_active,
            daysStartMinutes: day.days_start_minutes,
            daysStopMinutes: day.days_stop_minutes,
          }
        }),
        periodStart: campaign.campaign_period_start,
        periodStop: campaign.campaign_period_stop
      }
    } else {
      preparedPlaylist = {
        ...playlist,
        ...data,
        days: data.days.map(day => {
          delete day['campaign_id']
          return {
            id: day.id,
            dayNum: day.day_num,
            isActive: day.is_active,
            daysStartMinutes: day.days_start_minutes,
            daysStopMinutes: day.days_stop_minutes,
          }
        })
      }
    }

    storePlaylist(preparedPlaylist);

    onSubmitCampaign()
  };

  useEffect(() => {
    if (!playlist.isCampaignTimetable || !!playlist.projectPlaylist) {
      return;
    }

    setDisableForm(true);
  }, [playlist]);

  useEffect(() => {
    if (!watchIsCampaignTimetable) {
      return
    }

    //@ts-ignore
    if (watchIsCampaignTimetable === 'true') {
      setDisableForm(true);
    } else {
      setDisableForm(false);
    }
  }, [watchIsCampaignTimetable])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4} sx={{ mb: "23px" }} alignItems="flex-start">
        <Grid item xs={2.5}>
          {t("edit-campaign-playlist.field.schedule.is-campaign-schedule")}
        </Grid>
        <Grid item xs={9.5}>
          <RHFRadioGroup
            name='isCampaignTimetable'
            options={["true", "false"]}
            getOptionLabel={
              [
                "edit-campaign-playlist.field.schedule.yes",
                "edit-campaign-playlist.field.schedule.no"
              ]}
            sx={{ p: "0 9px" }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mb: "23px" }} alignItems="flex-start">
        <Grid item xs={2.5}>
          {t("edit-campaign-playlist.field.campaign-period")}
        </Grid>
        <Grid item xs={9.5} sx={{ display: "flex", columnGap: "14px" }}>
          <RHFDateField
            name="periodStart"
            inputFormat="дд/мм/гггг"
            disabled={disableForm}
            sx={{ maxWidth: 154 }}
          />
          <RHFDateField
            name="periodStop"
            inputFormat="дд/мм/гггг"
            disabled={disableForm}
            sx={{ maxWidth: 154 }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} alignItems="flex-start">
        <DaysGroupPicker
          nameRadioButton="campaign_days_type"
          nameFieldDays="days"
          watchNameRadioButton={watchSelectedType}
          disabled={disableForm}
        />
      </Grid>

      <StyledButtonWrapper>
        <LoadingButton
          variant="outlined"
          color="success"
          type="submit"
          sx={{ m: "18px 21px 18px 0" }}
          loading={isSubmitting}
        >
          {t("edit-campaign-playlist.button.save")}
        </LoadingButton>
      </StyledButtonWrapper>
    </FormProvider>
  );
};

export default memo(Schedule);
