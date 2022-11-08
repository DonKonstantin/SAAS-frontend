import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import { FormProvider, RHFDateField } from "components/hook-form";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import React, { FC, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DaysGroupPicker from "../../CommonComponents/DayChoosing/DaysGroupPicker";
import * as Yup from "yup";
import {
  CampaignDaysType,
  CampaignPlaylistConnect,
  CampaignPlaylistConnectDay,
} from "services/campaignListService/types";
import { CampaignDay } from "services/projectPlaylistService/interfaces";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { distinctUntilKeyChanged } from "rxjs";
import { notificationsDispatcher } from "services/notifications";

interface Props {
  storePlaylist: (playlist: CampaignPlaylistConnect) => void;
}

interface CampaignPlaylistEditFormFieldsType {
  days: CampaignDay[];
  campaign_days_type: CampaignDaysType;
}

const StyledAdvertisementWrapper = styled("div")({
  backgroundColor: "#F5F5F5",
  marginBottom: "13px",
  width: "100%",
  textAlign: "center",
  padding: 10,
});

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
const Schedule: FC<Props> = ({ storePlaylist }) => {
  const { t } = useTranslation();

  const { playlist, clearContext } = useCampaignPlaylistEditContext(
    distinctUntilKeyChanged("playlist")
  );

  const [disableForm, setDisableForm] = useState<boolean>(false);

  const messanger = notificationsDispatcher();

  const RegisterScheme = Yup.object().shape({});

  if (!playlist) {
    return null;
  }

  let defaultValues = {
    days: playlist.days.map((day, index) => ({
      da_num: day.dayNum,
      name: t(`edit-campaign-playlist.field.campaign-days.${index}`),
      is_active: day.isActive,
      days_start_minutes: day.daysStartMinutes,
      days_stop_minutes: day.daysStopMinutes,
    })),
    campaign_days_type: "daily" as CampaignDaysType,
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

  const onSubmit = async (data: CampaignPlaylistEditFormFieldsType) => {
    if (Object.keys(errors).length) {
      return;
    }

    if (!playlist) {
      return;
    }

    storePlaylist({
      ...playlist,
      daysType: data.campaign_days_type,
      //@ts-ignore
      days: data.days.map((day) => ({
        campaignPlaylistConnectId: "",
        dayNum: day.day_num,
        daysStartMinutes: day.days_start_minutes,
        daysStopMinutes: day.days_stop_minutes,
        isActive: day.is_active,
      })) as CampaignPlaylistConnectDay[],
    });

    messanger.dispatch({
      message: t("edit-campaign-playlist.success.store-campaign-playlist"),
      type: "success",
    });

    clearContext();
  };

  useEffect(() => {
    if (!playlist.isCampaignTimetable || !!playlist.projectPlaylist) {
      return;
    }

    setDisableForm(true);
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {disableForm && (
        <StyledAdvertisementWrapper>
          <Typography>
            {t("edit-campaign-playlist.field.is-campaign-schedule")}
          </Typography>
        </StyledAdvertisementWrapper>
      )}
      <Grid container spacing={4} sx={{ mb: "23px" }} alignItems="flex-start">
        <Grid item xs={2.5}>
          {t("edit-campaign-playlist.field.campaign-period")}
        </Grid>
        <Grid item xs={9.5} sx={{ display: "flex", columnGap: "14px" }}>
          <RHFDateField
            name="campaign_period_start"
            inputFormat="дд/мм/гггг"
            disabled={disableForm}
            sx={{ maxWidth: 154 }}
          />
          <RHFDateField
            name="campaign_period_stop"
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
