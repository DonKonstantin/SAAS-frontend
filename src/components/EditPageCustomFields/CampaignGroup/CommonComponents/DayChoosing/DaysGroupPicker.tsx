import { FormGroup, Grid, Stack } from "@mui/material";
import React, { FC, memo, useCallback } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import TimePickerComponent from "./TimePickerComponent";
import { useTranslation } from "react-i18next";
import RHFRadioGroup from "../../../../hook-form/RHFRadioGroup";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RHFCheckbox } from "../../../../hook-form";

dayjs.extend(duration);

type Props = {
  nameRadioButton: string;
  nameFieldDays: string;
  watchNameRadioButton: string;
  disabled?: boolean;
};

const DaysGroupPicker: FC<Props> = ({
                                      nameRadioButton,
                                      nameFieldDays,
                                      watchNameRadioButton,
                                      disabled,
                                    }) => {
  const { t } = useTranslation();

  const { control, setError, watch, clearErrors } = useFormContext();
  const daysData = watch(nameFieldDays);

  const { replace } = useFieldArray({
    control,
    name: nameFieldDays,
  });

  //Меняет время в конкретном дне недели
  const handleChangeTimeValue = useCallback(
    (id: number, time: number, field: "start" | "end") => {

      const errorMessage = {
        type: "required",
        message: t("pages.campaign.edit.errors.time.timeValue"),
      };

      let newArray;

      //Логика в случае если выбрано "Ежедневно"
      if (watchNameRadioButton === "daily") {

        //Определяем будут выбраны ли все поля дней недели
        const findDay = daysData[0];
        if (field === "start") {
          if (findDay.days_stop_minutes <= time) {
            setError(`${nameFieldDays}[${0}].days_start_minutes`, errorMessage);

            return;
          }

          // Проверяем корректное время
          if (isNaN(time)) {
            setError(`${nameFieldDays}[${0}].days_start_minutes`, errorMessage);

            return;
          }

          newArray = daysData.map((day) => ({
            ...day,
            is_active: true,
            days_start_minutes: time,
          }));
        } else {
          //! заказчик просил убрать проверку времени
          // if (findDay.days_start_minutes >= time) {
          //   setError(`${nameFieldDays}[${0}].days_stop_minutes`, errorMessage);

          //   return;
          // }

          // Проверяем корректное время
          if (isNaN(time)) {
            setError(`${nameFieldDays}[${0}].days_stop_minutes`, errorMessage);

            return;
          }

          newArray = daysData.map((day) => ({
            ...day,
            is_active: true,
            days_stop_minutes: time,
          }));
        }

        clearErrors();
        replace(newArray);
        return;
      }

      //Логика в случае если выбрано "По дням"
      const currentIdForSetError = id - 1
      const findDay = daysData[currentIdForSetError];

      // Проверяем корректное время
      if (isNaN(time)) {
        setError(`${nameFieldDays}[${currentIdForSetError}].days_start_minutes`, errorMessage);

        return;
      }

      if (field === "start") {
        if (findDay.days_stop_minutes <= time) {
          setError(
            `${nameFieldDays}[${currentIdForSetError}].days_start_minutes`,
            errorMessage
          );

          return;
        }

        newArray = daysData.map((day) =>
          day.day_num === id ? { ...day, days_start_minutes: time } : day
        );
      } else {
        if (findDay.days_start_minutes >= time) {
          setError(
            `${nameFieldDays}[${currentIdForSetError}].days_stop_minutes`,
            errorMessage
          );

          return;
        }

        newArray = daysData.map((day) =>
          day.day_num === id ? { ...day, days_stop_minutes: time } : day
        );
      }

      clearErrors();
      replace(newArray);
    },
    [daysData, watchNameRadioButton]
  );

  return (
    <>
      <Grid item xs={2.5}>
        {t("pages.campaign.add.fields.campaign_days.title")}
      </Grid>
      <Grid item xs={9.5}>
        <RHFRadioGroup
          name={nameRadioButton}
          options={["daily", "daysOfTheWeek"]}
          getOptionLabel={[
            t("pages.campaign.edit.fields.campaign_days_type.daily"),
            t("pages.campaign.edit.fields.campaign_days_type.daysOfTheWeek"),
          ]}
          sx={{ padding: "0 9px" }}
          disabled={disabled}
        />
        <FormGroup sx={{ pt: "34px" }}>
          {watchNameRadioButton === "daily" ? (
            <TimePickerComponent
              day_num={0}
              nameFieldDays={nameFieldDays}
              arrayFieldIndex={0}
              days_start_minutes={daysData[0].days_start_minutes}
              days_stop_minutes={daysData[0].days_stop_minutes}
              handleChangeTimeValue={handleChangeTimeValue}
              disabled={disabled}
            />
          ) : (
            <>
              {daysData.map((day, index) => (
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  key={day.day_num}
                  sx={{ pb: "17px" }}
                >
                  <RHFCheckbox
                    sx={{ minWidth: "145px", marginRight: "33px" }}
                    name={`${nameFieldDays}[${index}].is_active`}
                    label={t(`pages.campaign.add.fields.campaign_days.${index}`)}
                    disabled={disabled}
                  />
                  <TimePickerComponent
                    day_num={day.day_num}
                    nameFieldDays={nameFieldDays}
                    arrayFieldIndex={index}
                    days_start_minutes={day.days_start_minutes}
                    days_stop_minutes={day.days_stop_minutes}
                    handleChangeTimeValue={handleChangeTimeValue}
                    disabled={disabled}
                  />
                </Stack>
              ))}
            </>
          )}
        </FormGroup>
      </Grid>
    </>
  );
};

export default memo(DaysGroupPicker);
