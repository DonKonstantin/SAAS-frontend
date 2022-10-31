import { Checkbox, FormControlLabel, FormGroup, Grid, } from "@mui/material";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import TimePickerComponent from "./TimePickerComponent";
import { useTranslation } from "react-i18next";
import RHFRadioGroup from "../../../../hook-form/RHFRadioGroup";
import { useFieldArray, useFormContext } from "react-hook-form";

dayjs.extend(duration)

type Props = {
  nameRadioButton: string
  nameFieldDays: string
  watchNameRadioButton: string
}

export type DaysDataType = {
  id?: number
  day_num: number
  name?: string
  is_active: boolean
  days_start_minutes: number
  days_stop_minutes: number
}

const DaysGroupPicker: FC<Props> = ({ nameRadioButton, nameFieldDays, watchNameRadioButton }) => {

  const { t } = useTranslation()

  const [daysData, setDaysData] = useState<DaysDataType[]>([
    {
      day_num: 1,
      name: t("pages.campaign.add.fields.campaign_days.monday"),
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 1439
    },
    {
      day_num: 2,
      name: t("pages.campaign.add.fields.campaign_days.tuesday"),
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 1439
    },
    {
      day_num: 3,
      name: t("pages.campaign.add.fields.campaign_days.wednesday"),
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 1439
    },
    {
      day_num: 4,
      name: t("pages.campaign.add.fields.campaign_days.thursday"),
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 1439
    },
    {
      day_num: 5,
      name: t("pages.campaign.add.fields.campaign_days.friday"),
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 1439
    },
    {
      day_num: 6,
      name: t("pages.campaign.add.fields.campaign_days.saturday"),
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 1439
    },
    {
      day_num: 7,
      name: t("pages.campaign.add.fields.campaign_days.sunday"),
      is_active: true,
      days_start_minutes: 0,
      days_stop_minutes: 1439
    },
  ]);

  const { control, getValues, setError, clearErrors } = useFormContext();
  const { replace } = useFieldArray({
    control,
    name: nameFieldDays
  });

  useEffect(() => {
    const value = getValues("days")
    if (!value.length) {
      return
    }

    setDaysData(value)
  }, [getValues("days")])

  //Меняет активность по клику на чекбокс по дням
  function handleSelect(id: number, is_active: boolean) {
    const newArr = daysData.map(day => day.day_num === id ? { ...day, is_active: !is_active } : day)
    replace(newArr)
  }

  //Меняет время в конкретном дне недели
  const handleChangeTimeValue = useCallback((id: number, time: number, field: "start" | "end") => {
    const errorMessage = { type: 'required', message: t("pages.campaign.edit.errors.time.timeValue") }
    let newArray;

    //Логика в случае если выбрано "Ежедневно"
    if (watchNameRadioButton === "daily") { //Определяем будут выбраны ли все поля дней недели
      const findDay = daysData[0]
      if (field === "start") {
        if (findDay.days_stop_minutes <= time) {
          setError(`${nameFieldDays}[${0}].days_start_minutes`, errorMessage)

          return;
        }

        newArray = daysData.map(day => ({ ...day, is_active: true, days_start_minutes: time }))
      } else {
        if (findDay.days_start_minutes >= time) {
          setError(`${nameFieldDays}[${0}].days_stop_minutes`, errorMessage)

          return;
        }

        newArray = daysData.map(day => ({ ...day, is_active: true, days_stop_minutes: time }))
      }

      setDaysData(newArray)
      clearErrors()
      replace(newArray)
      return
    }

    //Логика в случае если выбрано "По дням"
    const findDay = daysData[id - 1]

    if (field === "start") {
      if (findDay.days_stop_minutes <= time) {
        setError(`${nameFieldDays}[${id - 1}].days_start_minutes`, errorMessage)

        return;
      }
      newArray = daysData.map(day => day.day_num === id ? { ...day, days_start_minutes: time } : day)
    } else {
      if (findDay.days_start_minutes >= time) {
        setError(`${nameFieldDays}[${id - 1}].days_stop_minutes`, errorMessage)

        return;
      }
      newArray = daysData.map(day => day.day_num === id ? { ...day, days_stop_minutes: time } : day)
    }
    setDaysData(newArray)
    clearErrors()
    replace(newArray)
  }, [daysData, watchNameRadioButton])

  // Преобразовываем данные в случае переключения в Radio button для выбора типа дней недели
  useEffect(() => {
    if (!watchNameRadioButton) {
      return
    }

    // Если выбрано "Ежедневно"
    if (watchNameRadioButton === "daily") {
      const newArray = daysData.map(day => ({
        ...day,
        is_active: true,
        days_start_minutes: 0,
        days_stop_minutes: 1439
      }))
      clearErrors()
      setDaysData(newArray)
      replace(newArray)
      return;
    }

    // Если выбрано "По дням"
    const newArray = daysData.map(day => ({
      ...day,
      is_active: false
    }))
    clearErrors()
    setDaysData(newArray)
    replace(newArray)
  }, [watchNameRadioButton])

  return (
    <>
      <Grid item xs={2.5}>
        {t("pages.campaign.add.fields.campaign_days.title")}
      </Grid>
      <Grid item xs={7.5}>
        <RHFRadioGroup
          name={nameRadioButton}
          options={['daily', "daysOfTheWeek"]}
          getOptionLabel={
            [
              t("pages.campaign.edit.fields.campaign_days_type.daily"),
              t("pages.campaign.edit.fields.campaign_days_type.daysOfTheWeek")
            ]}
          sx={{ padding: "0 9px" }}
        />
        <FormGroup sx={{ pt: "34px" }}>
          {
            watchNameRadioButton === "daily"
              ?
              <TimePickerComponent
                day_num={0}
                nameFieldDays={nameFieldDays}
                arrayFieldIndex={0}
                days_start_minutes={daysData[0].days_start_minutes}
                days_stop_minutes={daysData[0].days_stop_minutes}
                handleChangeTimeValue={handleChangeTimeValue}
              />
              :
              <>
                {daysData.map((day, index) => (
                    <Grid container direction='row' alignItems="flex-start" key={day.name} sx={{ pb: "17px" }}>
                      <Grid item xs={2}>
                        <FormControlLabel
                          sx={{ minWidth: "135px", marginRight: "33px" }}
                          control={
                            <Checkbox
                              checked={day.is_active}
                              onChange={() => handleSelect(day.day_num, day.is_active)}
                            />
                          }
                          key={day.name}
                          label={day.name}
                        />
                      </Grid>
                      <TimePickerComponent
                        key={day.name}
                        day_num={day.day_num}
                        nameFieldDays={nameFieldDays}
                        arrayFieldIndex={index}
                        days_start_minutes={day.days_start_minutes}
                        days_stop_minutes={day.days_stop_minutes}
                        handleChangeTimeValue={handleChangeTimeValue}
                      />
                    </Grid>
                  )
                )}
              </>
          }
        </FormGroup>

      </Grid>
    </>
  );
};

export default memo(DaysGroupPicker);
