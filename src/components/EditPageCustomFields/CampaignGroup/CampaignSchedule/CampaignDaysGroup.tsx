import { Checkbox, FormControlLabel, FormGroup, Grid, } from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";
import { EditFieldProperties } from "../../../../settings/pages/system/edit";
import useEntityEditField from "../../../EditPage/Fields/useEntityEditField";
import { distinctUntilChanged } from "rxjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import TimePickerCampaignComponent from "./TimePickerCampaignComponent";
import { Box } from "@mui/system";
import { getCurrentState } from "../../../../context/AuthorizationContext";

dayjs.extend(duration)


const CampaignDaysGroup: FC<EditFieldProperties & { valuesData: string }> = props => {

  const { fieldCode, valuesData } = props

  const fieldData = useEntityEditField(fieldCode, distinctUntilChanged(
    (previous, current) => {
      return previous?.entityData?.values[fieldCode] === current?.entityData?.values[fieldCode]
        && previous?.validation[fieldCode] === current?.validation[fieldCode]
    }
  ))
  const { domain, project } = getCurrentState()

  if (!fieldData) {
    return null
  }

  const {
    onChangeFieldValue,
  } = fieldData;

  const timeConverter = (time: string) => {
    const splitTimeToNumber = time.split(":").map(val => parseInt(val))
    return splitTimeToNumber[0] * 60 + splitTimeToNumber[1]
  }

  // const { t } = useTranslation();

  const [campaignDayData, setCampaignDayData] = useState<any>([
    {
      day_num: 1,
      name: 'Понедельник',
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 0
    },
    {
      day_num: 2,
      name: 'Вторник',
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 0
    },
    {
      day_num: 3,
      name: 'Среда',
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 0
    },
    {
      day_num: 4,
      name: 'Четверг',
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 0
    },
    {
      day_num: 5,
      name: 'Пятница',
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 0
    },
    {
      day_num: 6,
      name: 'Суббота',
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 0
    },
    {
      day_num: 7,
      name: 'Воскресенье',
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 0
    },
  ]);

  //Меняет активность по дням
  function handleSelect(id: string, is_active: boolean) {
    const newArr = campaignDayData.map(el => el.day_num === id ? { ...el, is_active: !is_active } : el)
    setCampaignDayData(newArr)
  }

  //Меняет время в конкретном дне недели
  const handleChangeTimeValue = (id: number, time: any, field: "start" | "end") => {
    let newArray;

    if (id === 0) { //ID = 0 для выбор всей дней
      if (field === "start") {
        newArray = campaignDayData.map(el => ({ ...el, is_active: true, days_start_minutes: timeConverter(time) }))
      } else {
        newArray = campaignDayData.map(el => ({ ...el, is_active: true, days_stop_minutes: timeConverter(time) }))
      }
      setCampaignDayData(newArray)
      return
    }

    if (field === "start") {
      newArray = campaignDayData.map(el => el.day_num === id ? { ...el, days_start_minutes: timeConverter(time) } : el)
    } else {
      newArray = campaignDayData.map(el => el.day_num === id ? { ...el, days_stop_minutes: timeConverter(time) } : el)
    }
    setCampaignDayData(newArray)
  }

  useEffect(() => {
    const filteredData = campaignDayData
      .filter(day => day.is_active)
      .map(day => ({
        ...day,
        campaign_id: domain,
        id: project
      }))

    onChangeFieldValue(() => filteredData)
  }, [campaignDayData])

  //Получаем данные для выбора типа дней недели
  useEffect(() => {
    if (!valuesData) {
      return
    }

    if (valuesData === "daily") {
      const newArray = campaignDayData.map(el => ({
        ...el,
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 0
      }))
      setCampaignDayData(newArray)

      return
    }

    const newArray = campaignDayData.map(el => ({
      ...el,
      is_active: false
    }))
    setCampaignDayData(newArray)
  }, [valuesData])

  return (
    <Box sx={{ pt: "34px" }}>
      {
        valuesData === "daily"
          ?
          <TimePickerCampaignComponent
            day_num={0}
            days_start_minutes={campaignDayData[0].days_start_minutes}
            days_stop_minutes={campaignDayData[0].days_stop_minutes}
            handleChangeTimeValue={handleChangeTimeValue}
          />
          :
          <FormGroup>
            {campaignDayData.map(name => {

                return (
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <FormControlLabel
                        sx={{ minWidth: "135px", marginRight: "33px" }}
                        control={
                          <Checkbox
                            checked={name.is_active}
                            onChange={() => handleSelect(name.day_num, name.is_active)}
                          />
                        }
                        key={name.name}
                        label={name.name}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TimePickerCampaignComponent
                        key={name.name}
                        day_num={name.day_num}
                        days_start_minutes={name.days_start_minutes}
                        days_stop_minutes={name.days_stop_minutes}
                        handleChangeTimeValue={handleChangeTimeValue}
                      />
                    </Grid>
                  </Grid>
                )
              }
            )}
          </FormGroup>
      }
    </Box>
  );
};

export default memo(CampaignDaysGroup);
