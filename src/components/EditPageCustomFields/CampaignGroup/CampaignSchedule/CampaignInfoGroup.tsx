import { distinctUntilKeyChanged } from "rxjs";
import { Button, Grid, Paper, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import CampaignSchedule from "./CampaignSchedule";
import { useTranslation } from "react-i18next";
import { FormProvider } from "../../../hook-form";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCurrentState } from "../../../../context/AuthorizationContext";
import { useRouter } from "next/router";
import { Channels } from "../Channels";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { EditPlaylist } from "../EditPlaylist";
import { campaignListService } from "../../../../services/campaignListService";
import { CampaignDay } from "../../../../services/projectPlaylistService/interfaces";
import {
  CampaignChannelInputObject,
  CampaignPlaylistConnect,
  CampaignPlaylistConnectInput,
} from "../../../../services/campaignListService/types";
import LoadingBlocker from "../../../LoadingBlocker";
import CampaignPlaylistEditContextConnector from "context/CampaignPlaylistEditContext/CampaignPlaylistEditContextConnector";

enum optionsForTabs {
  "schedule" = "schedule",
  "content" = "content",
  "channels" = "channels",
}

export type FormValuesProps = {
  // campaign_type: "simple" | "mute"
  // timeQueue: number
  // campaign_end_type: "finish" | "break"
  // campaign_priority: "higher" | "background" | "low" | "normal" | "high"
  // campaign_low_priority_end_type?: "finish" | "break"
  // campaign_play_type: "periodic" | "continuous"
  // campaign_play_tracks_quantity: number
  // campaign_play_tracks_period_value: number
  // campaign_play_tracks_period_type: "hours" | "minutes"
  // campaign_period_start: any
  // campaign_period_stop: any
  // campaign_days_type: "daily" | "daysOfTheWeek"
  name: string;
  campaign_type: string;
  timeQueue?: number;
  campaign_end_type: string;
  campaign_priority: string;
  campaign_low_priority_end_type: string;
  campaign_play_type: string;
  campaign_play_tracks_quantity: number;
  campaign_play_tracks_period_value: number;
  campaign_play_tracks_period_type: string;
  campaign_period_start: Date | null;
  campaign_period_stop: Date | null;
  campaign_days_type: string;
  days: CampaignDay[];
  playlists: CampaignPlaylistConnectInput[];
  project_id: string;
  // id: number
  campaign_play_order: string;
  campaign_all_days_stop_minutes: number;
  channels: CampaignChannelInputObject[];
  campaign_all_days_start_minutes: number;
};

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const asPathWithoutQuery = router.asPath.split("?")[0];
  const asPathNestedRoutes = asPathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0)
    .at(-1);

  let tabOptions = Object.keys(optionsForTabs);
  if (asPathNestedRoutes === "add") {
    tabOptions = tabOptions.slice(0, 1);
  }

  const RegisterScheme = Yup.object().shape({
    name: Yup.string().required(t("pages.campaign.edit.errors.required")),
    campaign_period_start: Yup.date()
      .required(t("pages.campaign.edit.errors.required"))
      .nullable(),
    campaign_period_stop: Yup.date()
      .required(t("pages.campaign.edit.errors.required"))
      .nullable()
      .min(
        Yup.ref("campaign_period_start"),
        t("pages.campaign.edit.errors.date.dateValue")
      ),
    timeQueue: Yup.number().when("campaign_type", {
      is: "simple",
      then: Yup.number()
        .typeError(t("pages.campaign.edit.errors.number.positive"))
        .min(1, t("pages.campaign.edit.errors.number.positive"))
        .integer(t("pages.campaign.edit.errors.number.integer"))
        .required(t("pages.campaign.edit.errors.required")),
    }),
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
    campaign_type: "mute", // Тип кампании
    timeQueue: 0, // Время ожидания в очереди TODO изменить название после добавления в запрос
    campaign_end_type: "break", // После окончания (Режим работы после окончания)
    campaign_priority: "higher", // Приоритет - приоритет кампании
    campaign_low_priority_end_type: "break", // Кампании с меньшим приоритетом
    campaign_play_type: "continuous", // Воспроизведение
    campaign_play_tracks_quantity: 0, // Количество треков для периодического воспроизведения
    campaign_play_tracks_period_value: 0, // Количество времени для периодического воспроизведения
    campaign_play_tracks_period_type: "minutes", // Тип времени для периодического воспроизведения
    campaign_period_start: null, // Период кампании (начало)
    campaign_period_stop: null, // Период кампании (окончание)
    campaign_days_type: "daily", // Дни недели
    days: [
      {
        day_num: 1,
        name: t("pages.campaign.add.fields.campaign_days.monday"),
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439,
      },
      {
        day_num: 2,
        name: t("pages.campaign.add.fields.campaign_days.tuesday"),
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439,
      },
      {
        day_num: 3,
        name: t("pages.campaign.add.fields.campaign_days.wednesday"),
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439,
      },
      {
        day_num: 4,
        name: t("pages.campaign.add.fields.campaign_days.thursday"),
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439,
      },
      {
        day_num: 5,
        name: t("pages.campaign.add.fields.campaign_days.friday"),
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439,
      },
      {
        day_num: 6,
        name: t("pages.campaign.add.fields.campaign_days.saturday"),
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439,
      },
      {
        day_num: 7,
        name: t("pages.campaign.add.fields.campaign_days.sunday"),
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439,
      },
    ], // Дни расписания кампании

    // TODO ниже запросы по умолчанию для создания компании
    playlists: [], // Плейлисты, подключенные к кампании
    // id: 0, // ID сущности
    campaign_play_order: "byOrder", // Тип времени для периодического воспроизведения
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

  const storePlaylist = (playlist: CampaignPlaylistConnect) => {
    const currentPlaylists = getValues().playlists;

    const storedPlaylist = {
      projectPlaylistId: playlist.projectPlaylistId,
      days: playlist.days,
      playCounter: playlist.playCounter,
      periodStop: playlist.periodStop,
      shuffle: playlist.shuffle,
      periodStart: playlist.periodStart,
      daysType: playlist.daysType,
      sortOrder: playlist.sortOrder,
      id: playlist.id,
      isCampaignTimetable: playlist.isCampaignTimetable,
      allDaysStartMinutes: playlist.allDaysStartMinutes,
      allDaysStopMinutes: playlist.allDaysStopMinutes,
      campaignPlaylistId: playlist.campaignPlaylistId,
    }

    if (!playlist.id) {
      // setValue('playlists', [...currentPlaylists, playlist]);
    }
  };

  const onSubmit = async (data: FormValuesProps) => {
    if (Object.keys(errors).length) {
      return;
    }

    delete data["timeQueue"]; //TODO удалить, когда будет добавлен сущность в запрос

    const days = data.days.map((day) => {
      delete day["name"];
      return {
        ...day,
      };
    });

    const newData = { ...data, days, project_id: project, id: domain };

    try {
      //@ts-ignore
      const response = await campaignListService().storeCampaign(newData);
      router.push(
        `/domain/${domain}/project/${project}/campaign/edit/${response}`
      );
    } catch (e) {}
  };

  //Выбор контетной табы
  const [currentActionTab, setCurrentActionTab] = useState<string>("schedule");

  const changeCurrentTab = (_event: React.SyntheticEvent, newValue: any) => {
    // setCurrentActionTab(newValue);
  };

  // Устанавливает значения по умолчанию если Тип компании выбран "Mute"
  useEffect(() => {
    if (watchTime.campaign_type === "mute") {
      setValue("timeQueue", 0);
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

  useEffect(() => {
    if (!asPathNestedRoutes) {
      return;
    }

    if (isNaN(parseInt(asPathNestedRoutes))) {
      return;
    }

    setIsLoading(true);

    const asyncFunction = async () => {
      try {
        const response = await campaignListService().getCampaignById(
          asPathNestedRoutes
        );
        console.log(response);
        //@ts-ignore
        Object.entries(response).forEach(([key, value]) => setValue(key, value)
        );
      } catch (e) {}
    };

    asyncFunction().finally(() => setIsLoading(false));
  }, [asPathNestedRoutes]);

  if (isLoading) {
    return <LoadingBlocker />;
  }

  return (
    <>
      <CampaignPlaylistEditContextConnector>
        //! условие появление модалки поправить
        {!!playlist && <EditPlaylist  storePlaylist={() => {}}/>}
        {/* <Grid item xs={12}>
    <Box sx={{ width: '100%' }}>
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
              <Stack direction="row" justifyContent="flex-end">
                <LoadingButton
                  variant="outlined"
                  color="success"
                  type="submit"
                  sx={{ m: "18px 21px 18px 0" }}
                  loading={isSubmitting}
                >
                  {t("pages.campaign.add.buttons.save")}
                </LoadingButton>
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
      </FormProvider>
    </Box>
  </Grid> */}
      </CampaignPlaylistEditContextConnector>
    </>
  );
};

// Экспортируем компонент
export default CampaignInfoGroup;
