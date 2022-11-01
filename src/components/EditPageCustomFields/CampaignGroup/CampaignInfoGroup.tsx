import React, { useEffect, useState } from "react";
import { Alert, Collapse, Grid, Paper, Tab } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { FormProvider } from "../../hook-form";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { getCurrentState } from "../../../context/AuthorizationContext";
import { useRouter } from "next/router";
import { Channels } from "./Channels";
import { campaignListService } from "../../../services/campaignListService";
import {
  CampaignEndType,
  CampaignLowPriority,
  CampaignPeriodType,
  CampaignPlayOrder,
  CampaignPlayType,
  CampaignPriority,
  CampaignType
} from "../../../services/projectPlaylistService/interfaces";
import { CampaignDaysType, CampaignInput } from "../../../services/campaignListService/types";
import LoadingBlocker from "../../LoadingBlocker";
import CampaignSchedule from "./CampaignSchedule/CampaignSchedule";
import { useCampaignEditContext } from "../../../context/CampaignEditContext/useCampaignEditContext";
import { distinctUntilChanged } from "rxjs";
import { isEqual } from "lodash";

enum optionsForTabs {
  "schedule" = "schedule",
  "content" = "content",
  "channels" = "channels",
}

enum daysName {
  "monday" = 1,
  "tuesday" = 2,
  "wednesday" = 3,
  "thursday" = 4,
  "friday" = 5,
  "saturday" = 6,
  "sunday" = 7
}

export type FormValuesProps = CampaignInput

// Компонент вывода группы создания компании
const CampaignInfoGroup = () => {

  const { t } = useTranslation()
  const router = useRouter();
  const { domain, project } = getCurrentState()

  if (!domain || !project) {
    return null
  }

  const {
    campaign,
    isLoading,
    campaignListErrorText,
    loadCampaign
  } = useCampaignEditContext(distinctUntilChanged((prev, curr) => (
    prev.isLoading === curr.isLoading &&
    isEqual(prev.campaign, curr.campaign)
  )))

  const [showSuccessUpdate, setShowSuccessUpdate] = useState<boolean>(false);
  const [showSuccessUpdateName, setShowSuccessUpdateName] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const asPathWithoutQuery = router.asPath.split("?")[0];
  const asPathNestedRoutes = asPathWithoutQuery.split("/")
    .filter(v => v.length > 0).at(-1);

  let tabOptions = Object.keys(optionsForTabs)

  if (!router.query.entityId) {
    tabOptions = tabOptions.slice(0, 1)
  }

  const RegisterScheme = Yup.object().shape({
    name: Yup.string()
      .required(t("pages.campaign.edit.errors.required")),
    campaign_period_start: Yup.date()
      .required(t("pages.campaign.edit.errors.required"))
      .nullable(),
    campaign_period_stop: Yup.date()
      .required(t("pages.campaign.edit.errors.required"))
      .nullable()
      .min(Yup.ref('campaign_period_start'), t("pages.campaign.edit.errors.date.dateValue")),
    campaign_play_tracks_quantity: Yup.number()
      .when('campaign_play_type', {
        is: "periodic",
        then: Yup.number()
          .typeError(t("pages.campaign.edit.errors.number.positive"))
          .min(1, t("pages.campaign.edit.errors.number.positive"))
          .integer(t("pages.campaign.edit.errors.number.integer"))
          .required(t("pages.campaign.edit.errors.required"))
      }),
    campaign_play_tracks_period_value: Yup.number()
      .when('campaign_play_type', {
        is: "periodic",
        then: Yup.number()
          .typeError(t("pages.campaign.edit.errors.number.positive"))
          .min(1, t("pages.campaign.edit.errors.number.positive"))
          .integer(t("pages.campaign.edit.errors.number.integer"))
          .required(t("pages.campaign.edit.errors.required"))
      })
  })

  let defaultValues = {
    name: '', // Название кампании
    campaign_type: 'mute' as CampaignType, // Тип кампании
    campaign_end_type: 'break' as CampaignEndType, // После окончания (Режим работы после окончания)
    campaign_priority: 'higher' as CampaignPriority, // Приоритет - приоритет кампании
    campaign_low_priority_end_type: 'break' as CampaignLowPriority, // Кампании с меньшим приоритетом
    campaign_play_type: 'continuous' as CampaignPlayType, // Воспроизведение
    campaign_play_tracks_quantity: 0, // Количество треков для периодического воспроизведения
    campaign_play_tracks_period_value: 0, // Количество времени для периодического воспроизведения
    campaign_play_tracks_period_type: "minutes" as CampaignPeriodType, // Тип времени для периодического воспроизведения
    campaign_period_start: null, // Период кампании (начало)
    campaign_period_stop: null, // Период кампании (окончание)
    campaign_days_type: "daily" as CampaignDaysType, // Дни недели
    days: Object.keys(daysName).slice(7).map((day, index) => (
      {
        day_num: index + 1,
        name: t(`pages.campaign.add.fields.campaign_days.${day}`),
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439
      }
    )), // Дни расписания кампании
    playlists: [], // Плейлисты, подключенные к кампании
    campaign_play_order: 'byOrder' as CampaignPlayOrder, // Тип времени для периодического воспроизведения
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
    formState: { isSubmitting, errors },
  } = methods;

  const watchTime = {
    campaign_type: watch('campaign_type'),
    campaign_priority: watch('campaign_priority'),
    campaign_play_type: watch('campaign_play_type'),
    campaign_days_type: watch('campaign_days_type')
  }

  const onSubmit = async (data: FormValuesProps) => {
    setShowError(false)
    if (Object.keys(errors).length) {
      return
    }

    let newData;

    const days = data.days
      .map(day => {
        let daysForData = {
          day_num: day.day_num,
          days_start_minutes: day.days_start_minutes,
          days_stop_minutes: day.days_stop_minutes,
          is_active: day.is_active
        }
        if (day.id) {
          return (
            { ...daysForData, id: day.id }
          )
        }

        return daysForData
      })

    delete data['version']

    if (router.query.entityId) {
      newData = { ...data, days, project_id: project, id: router.query.entityId }
    } else {
      newData = { ...data, days, project_id: project }
    }

    try {
      const response = await campaignListService().storeCampaign(newData)

      if (asPathNestedRoutes && isNaN(parseInt(asPathNestedRoutes))) {
        router.push(`/domain/${domain}/project/${project}/campaign/edit/${response}`);
        return
      }

      setShowSuccessUpdate(true)
      setShowSuccessUpdateName(data.name)
    } catch (error) {
      setErrorText(error)
      setShowError(!!error)
    }
  }

  //Выбор контетной табы
  const [currentActionTab, setCurrentActionTab] = useState<string>("schedule");

  const changeCurrentTab = (_event: React.SyntheticEvent, newValue: any) => {
    setCurrentActionTab(newValue);
  };

  // Устанавливает значения по умолчанию если Тип компании выбран "Mute"
  useEffect(() => {
    if (watchTime.campaign_type === 'mute') {
      setValue('campaign_end_type', 'break')
      setValue('campaign_priority', 'higher')
      setValue('campaign_low_priority_end_type', 'break')
      setValue('campaign_play_type', 'continuous')
    }
  }, [watchTime.campaign_type])

  // Устанавливает значение "Компании с меньшим приоритетом" по умолчанию если Приоритет выбран "Фоновый"
  useEffect(() => {
    if (watchTime.campaign_priority === 'background') {
      setValue('campaign_low_priority_end_type', "break")
    }
  }, [watchTime.campaign_priority])

// Эффект отвечающий за загрузку данных компании
  useEffect(() => {
    if (!router.query.entityId) {
      return
    }

    //@ts-ignore
    loadCampaign(router.query.entityId)
  }, [router.query.entityId])

  // Устанавливаем данные в форму, когда получаем компанию
  useEffect(() => {
    if (!campaign || !router.query.entityId) {
      return
    }

    Object.entries(campaign).forEach(([key, value]) => {
      if (key === 'days') {
        const newDate = value.map(el => ({
          ...el,
          name: t(`pages.campaign.add.fields.campaign_days.${daysName[el.day_num]}`)
        }))
        setValue(key, newDate)
      } else {
        setValue(key as any, value)
      }
    })

  }, [campaign, router.query.entityId])

  // Авто закрытие сообщений
  useEffect(() => {
    if (!campaignListErrorText) {
      return
    }

    setShowError(!!campaignListErrorText)
    setErrorText(campaignListErrorText)
  }, [campaignListErrorText])

  // Авто закрытие сообщений
  useEffect(() => {
    if (!showSuccessUpdateName || !campaignListErrorText) {
      return
    }

    const newTO = setTimeout(() => {
      setShowSuccessUpdate(false)
      setShowError(false)
    }, 6000)

    return () => {
      clearTimeout(newTO)
    }
  }, [showSuccessUpdateName, campaignListErrorText])

  if (isLoading) {
    return <LoadingBlocker/>
  }

  return (
    <>
      <Grid item xs={12}>
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

                <Collapse in={showSuccessUpdate}>
                  <Alert severity="info" sx={{ mb: 3 }} onClose={() => setShowSuccessUpdate(false)}>
                    {t('pages.campaign.edit.successMessages.updateName', { name: showSuccessUpdateName })}
                  </Alert>
                </Collapse>

                <Collapse in={showError}>
                  <Alert severity="error" sx={{ mb: 3 }} onClose={() => setShowError(false)}>
                    {errorText}
                  </Alert>
                </Collapse>

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
      </Grid>
    </>
  );
};

// Экспортируем компонент
export default CampaignInfoGroup;
