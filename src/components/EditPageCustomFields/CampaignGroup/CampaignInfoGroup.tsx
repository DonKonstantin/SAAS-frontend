import {distinctUntilChanged, distinctUntilKeyChanged} from "rxjs";
import {Box, Grid, Paper, Stack, Tab} from "@mui/material";
import React, {useEffect, useState} from "react";
import {LoadingButton, TabContext, TabList, TabPanel} from "@mui/lab";
import {useTranslation} from "react-i18next";
import {FormProvider} from "../../hook-form";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {getCurrentState} from "../../../context/AuthorizationContext";
import {useRouter} from "next/router";
import {useCampaignPlaylistEditContext} from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import CampaignPlaylistEditContextConnector
  from "context/CampaignPlaylistEditContext/CampaignPlaylistEditContextConnector";
import {Channels} from "./Channels";
import {campaignListService} from "../../../services/campaignListService";
import {
  CampaignEndType,
  CampaignLowPriority,
  CampaignPeriodType,
  CampaignPlayOrder,
  CampaignPlayType,
  CampaignPriority,
  CampaignType,
} from "../../../services/projectPlaylistService/interfaces";
import {CampaignDaysType, CampaignInput,} from "../../../services/campaignListService/types";
import LoadingBlocker from "../../LoadingBlocker";
import {useCampaignEditContext} from "../../../context/CampaignEditContext/useCampaignEditContext";
import {isEqual, xor} from "lodash";
import CampaignSchedule from "./CampaignSchedule/CampaignSchedule";
import CampaignContent from "./CampaignContent/CampaignContent";
import {EditPlaylist} from "./EditPlaylist";
import dayjs from "dayjs";
import {notificationsDispatcher} from "services/notifications";

enum optionsForTabs {
  "schedule" = "schedule",
  "content" = "content",
  "channels" = "channels",
}

export enum daysName {
  "monday" = "monday",
  "tuesday" = "monday",
  "wednesday" = "monday",
  "thursday" = "monday",
  "friday" = "monday",
  "saturday" = "monday",
  "sunday" = "monday"
}

export type FormValuesProps = CampaignInput

// Компонент вывода группы создания компании
const CampaignInfoGroup = () => {
  const { playlist } = useCampaignPlaylistEditContext(
    distinctUntilKeyChanged("playlist")
  );

  const { t } = useTranslation();
  const router = useRouter();
  const { domain, project } = getCurrentState();

  if (!domain || !project) {
    return null;
  }

  const {
    campaign,
    isInitialized,
    campaignListErrorText,
    successCreatedPlaylist,
    selectedChannels,
    loadCampaign,
    newAddedCampaignPlaylist,
  } =
    useCampaignEditContext(
      distinctUntilChanged(
        (prev, curr) =>
          prev.isInitialized === curr.isInitialized &&
          prev.successCreatedPlaylist === curr.successCreatedPlaylist &&
          isEqual(prev.campaign, curr.campaign) &&
          !xor(prev.selectedChannels, curr.selectedChannels).length
      )
    );

  const { clearContext } = useCampaignPlaylistEditContext();

  //Выбор контетной табы
  const [currentActionTab, setCurrentActionTab] = useState<string>("schedule");

  const [saveCampaign, setSaveCampaign] = useState<boolean>(false);

  const addPlaylist = () => {
    setSaveCampaign(true)
  }

  const changeCurrentTab = (_event: React.SyntheticEvent, newValue: any) => {
    setCurrentActionTab(newValue);
  };

  const asPathWithoutQuery = router.asPath.split("?")[0];
  const asPathNestedRoutes = asPathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0)
    .at(-1);

  let tabOptions = Object.keys(optionsForTabs);
  if (asPathNestedRoutes === "add") {
    tabOptions = tabOptions.slice(0, 1);
  }

  const messanger = notificationsDispatcher();

  const RegisterScheme = Yup.object().shape({
    name: Yup.string().required(t("pages.campaign.edit.errors.required")),
    campaign_period_start: Yup.date()
      .required(t("pages.campaign.edit.errors.required"))
      .nullable()
      .test('test_day_start_type', t("pages.campaign.edit.errors.date.check-date"), async (value) => dayjs(value).isValid())
      .typeError(t("pages.campaign.edit.errors.date.check-date")),
    campaign_period_stop: Yup.date()
      .required(t("pages.campaign.edit.errors.required"))
      .nullable()
      .min(
        Yup.ref("campaign_period_start"),
        t("pages.campaign.edit.errors.date.minDate")
      )
      .test('test_day_stop_type', t("pages.campaign.edit.errors.date.check-date"), async (value) => dayjs(value).isValid())
      .typeError(t("pages.campaign.edit.errors.date.check-date")),
    campaign_play_tracks_quantity: Yup.number().when("campaign_play_type", {
      is: "periodic",
      then: Yup.number()
        .typeError(t("pages.campaign.edit.errors.number.positive"))
        .min(1, t("pages.campaign.edit.errors.number.positive"))
        .integer(t("pages.campaign.edit.errors.number.integer"))
        .required(t("pages.campaign.edit.errors.required")),
    }),
    campaign_play_tracks_period_value: Yup.number().when("campaign_play_type", {
      is: "periodic",
      then: Yup.number()
        .typeError(t("pages.campaign.edit.errors.number.positive"))
        .min(1, t("pages.campaign.edit.errors.number.positive"))
        .integer(t("pages.campaign.edit.errors.number.integer"))
        .required(t("pages.campaign.edit.errors.required")),
    }),
  });

  let defaultValues = {
    name: "", // Название кампании
    campaign_type: "mute" as CampaignType, // Тип кампании
    campaign_end_type: "break" as CampaignEndType, // После окончания (Режим работы после окончания)
    campaign_priority: "higher" as CampaignPriority, // Приоритет - приоритет кампании
    campaign_low_priority_end_type: "break" as CampaignLowPriority, // Кампании с меньшим приоритетом
    campaign_play_type: "continuous" as CampaignPlayType, // Воспроизведение
    campaign_play_tracks_quantity: 0, // Количество треков для периодического воспроизведения
    campaign_play_tracks_period_value: 0, // Количество времени для периодического воспроизведения
    campaign_play_tracks_period_type: "minutes" as CampaignPeriodType, // Тип времени для периодического воспроизведения
    campaign_period_start: null, // Период кампании (начало)
    campaign_period_stop: null, // Период кампании (окончание)
    campaign_days_type: "daily" as CampaignDaysType, // Дни недели
    days: Object.keys(daysName)
      .map((_, index) => ({
        day_num: index + 1,
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439,
      })), // Дни расписания кампании
    playlists: [], // Плейлисты, подключенные к кампании
    campaign_play_order: "byOrder" as CampaignPlayOrder, // Тип времени для периодического воспроизведения
    campaign_all_days_stop_minutes: 0, // Дни недели (окончание общее)
    channels: [], // Каналы, подключенные к кампании
    campaign_all_days_start_minutes: 0, // Дни недели (начало общее)
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterScheme),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const watchTime = {
    campaign_type: watch("campaign_type"),
    campaign_priority: watch("campaign_priority"),
    campaign_play_type: watch("campaign_play_type"),
    campaign_days_type: watch("campaign_days_type"),
  };

  const onSubmit = async (data?: FormValuesProps) => {
    if (Object.keys(errors).length) {
      return;
    }

    const campaignDaysType = getValues('campaign_days_type')

    if (!router.query.entityId && data) {

      const days = data.days.map((day) => {
        if (campaignDaysType === 'daily') {
          const getDayForTime = data.days[0]

          return ({
            ...day,
            days_start_minutes: getDayForTime.days_start_minutes,
            days_stop_minutes: getDayForTime.days_stop_minutes,
            is_active: true,
          })
        }

        return day
      });

      delete data["version"];

      const newData = {
        ...data,
        campaign_period_start: new Date(dayjs(data.campaign_period_start).format("YYYY-MM-DD")),
        campaign_period_stop: new Date(dayjs(data.campaign_period_stop).format("YYYY-MM-DD")),
        days,
        project_id: project
      }

      try {
        const response = await campaignListService().storeCampaign(newData);

        if (asPathNestedRoutes && isNaN(parseInt(asPathNestedRoutes))) {
          router.push(
            `/domain/${domain}/project/${project}/campaign/edit/${response}`
          );
          return;
        }

        messanger.dispatch({
          message: t("pages.campaign.edit.successMessages.updateName", {
            name: data.name,
          }),
          type: "success",
        });
      } catch (error) {
        if (typeof error.message === "string") {
          messanger.dispatch({
            message: t("pages.campaign.edit.errors.notifications.storeCampaign"),
            type: "error",
          });
        }
      }

      return
    }

    if (!campaign) {
      return
    }

    const playlistInput = campaign.playlists.map(playlist => {

      let projectOrCampaignPlaylistId;
      if (playlist.campaignPlaylistId) {
        projectOrCampaignPlaylistId = { campaignPlaylistId: playlist.campaignPlaylistId }
      } else {
        projectOrCampaignPlaylistId = { projectPlaylistId: playlist.projectPlaylistId }
      }

      return (
        {
          playCounter: playlist.playCounter,
          periodStop: playlist.periodStop,
          shuffle: playlist.shuffle,
          periodStart: playlist.periodStart,
          daysType: playlist.daysType,
          days: playlist.days,
          id: playlist.id,
          isCampaignTimetable: playlist.isCampaignTimetable,
          allDaysStartMinutes: playlist.allDaysStartMinutes,
          allDaysStopMinutes: playlist.allDaysStopMinutes,
          sortOrder: playlist.sortOrder,
          ...projectOrCampaignPlaylistId
        }
      )
    })

    const getDaysFromForm = getValues('days')

    const days = getDaysFromForm.map((day) => {
      if (campaignDaysType === 'daily') {
        const getDayForTime = getDaysFromForm[0]

        return ({
          day_num: day.day_num,
          days_start_minutes: getDayForTime.days_start_minutes,
          days_stop_minutes: getDayForTime.days_stop_minutes,
          is_active: true,
          id: day.id
        })
      }

      delete day['campaign_id']

      return day
    });

    const channels = campaign.channels.map(channel => {
      if (channel.channel_id) {

        return { channel_id: Number(channel.channel_id), id: Number(channel.id) }
      }

      return { channel_id: Number(channel.id) }
    });

    //  Если было взаимодействие со вкладкой каналов то берем каналы обработанные на этой вкладке
    const commonChannels = selectedChannels || channels;

    setValue('days', days)
    setValue('playlists', playlistInput)
    setValue('channels', commonChannels)
    const inputData = getValues()

    delete inputData["version"];

    let responseCampaignValidation;

    try {
      responseCampaignValidation = await campaignListService().campaignValidation(inputData)
    } catch (error) {
      if (typeof error.message === "string") {
        messanger.dispatch({
          message: t("pages.campaign.edit.errors.notifications.playlistPeriod"),
          type: "error",
        });
      }
    }

    if (!responseCampaignValidation) {
      return
    }

    try {
      await campaignListService().storeCampaign(inputData)
      !successCreatedPlaylist && setCurrentActionTab("channels")
    } catch (error) {
      if (typeof error.message === "string") {
        messanger.dispatch({
          message: t("pages.campaign.edit.errors.notifications.storeCampaign"),
          type: "error",
        });
      }
    }
  };

  // Автосохранение компании при добавлении музыки
  useEffect(() => {
    if (!campaign || !successCreatedPlaylist) {
      return
    }

    onSubmit().finally(() => {
      newAddedCampaignPlaylist(false)
      setSaveCampaign(false)
    })
  }, [campaign, successCreatedPlaylist])

  // Устанавливает значения по умолчанию если Тип компании выбран "Mute"
  useEffect(() => {
    if (watchTime.campaign_type === "mute") {
      setValue("campaign_end_type", "break");
      setValue("campaign_priority", "higher");
      setValue("campaign_low_priority_end_type", "break");
      setValue("campaign_play_type", "continuous");
    }
  }, [watchTime.campaign_type]);

  // Устанавливает значение "Компании с меньшим приоритетом" по умолчанию если Приоритет выбран "Фоновый"
  useEffect(() => {
    if (watchTime.campaign_priority === "background") {
      setValue("campaign_low_priority_end_type", "break");
    }
  }, [watchTime.campaign_priority]);

  // Эффект отвечающий за загрузку данных компании
  useEffect(() => {
    if (!router.query.entityId) {
      return;
    }

    //@ts-ignore
    loadCampaign(router.query.entityId);
  }, [router.query.entityId]);

  // Устанавливаем данные в форму, когда получаем компанию
  useEffect(() => {
    if (!campaign || !router.query.entityId) {
      return;
    }

    Object.entries(campaign).forEach(([key, value]) => {
      setValue(key as any, value);
    });
  }, [campaign, router.query.entityId]);

  // Авто закрытие сообщений
  useEffect(() => {
    if (!campaignListErrorText) {
      return;
    }

    messanger.dispatch({
      message: campaignListErrorText,
      type: "error",
    });
  }, [campaignListErrorText]);

  //При закрытии редактирования компани очищяем контекст
  useEffect(() => {
    return () => clearContext()
  }, [])

  useEffect(() => {
    if (!playlist || !campaign) {
      return
    }

    if (!saveCampaign) {
      return
    }

    const saveCompany = async () => {
      try {
        await onSubmit()
        clearContext()
      } catch (error) {
        if (typeof error.message === "string") {
          messanger.dispatch({
            message: t("pages.campaign.edit.errors.notifications.storeCampaign"),
            type: "error",
          });
        }
      }
    }

    saveCompany().finally(() => {
      setSaveCampaign(false)
      messanger.dispatch({
        message: t("edit-campaign-playlist.success.store-campaign-playlist"),
        type: "success",
      });
    })

  }, [saveCampaign, campaign, playlist])

  if (isInitialized) {
    return <LoadingBlocker/>;
  }

  return (
    <>
      <CampaignPlaylistEditContextConnector>
        {!!playlist
          ? <EditPlaylist onSubmitCampaign={addPlaylist}/>
          :
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                      {tabOptions.map((permission) => (
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
                      <CampaignSchedule watchTime={watchTime}/>
                    </TabPanel>
                    <TabPanel
                      value={optionsForTabs.content}
                      key={optionsForTabs.content}
                      sx={{ p: 0 }}
                    >
                      <CampaignContent/>
                    </TabPanel>
                    <TabPanel
                      value={optionsForTabs.channels}
                      key={optionsForTabs.channels}
                      sx={{ p: 0 }}
                    >
                      <Channels/>
                    </TabPanel>
                    <Stack direction="row" justifyContent="flex-end">
                      {
                        currentActionTab !== optionsForTabs.channels &&
                          <LoadingButton
                              variant="outlined"
                              color="success"
                              type="submit"
                              sx={{ m: "18px 21px 18px 0" }}
                              loading={isSubmitting}
                          >
                            {t("pages.campaign.add.buttons.save")}
                          </LoadingButton>
                      }
                    </Stack>
                  </Paper>
                </TabContext>
              </FormProvider>
            </Box>
          </Grid>
        }

      </CampaignPlaylistEditContextConnector>
    </>
  );
};

// Экспортируем компонент
export default CampaignInfoGroup;