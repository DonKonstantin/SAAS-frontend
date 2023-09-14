// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { DesktopTimePicker, LocalizationProvider } from "@mui/lab";
import dayjs from "dayjs";
import { timeConverter, timeConverterNumberForTime } from 'components/timeConverter';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  day_num: number;
  timeValue: number;
  fieldType: "start" | "end";
  disabled?: boolean;
  disableOpenPicker?: boolean;
  handleChangeTimeValue(day_num: number, dayTime: number, field: "start" | "end"): void;
}

export default function RHFTimeField({
  name,
  day_num,
  timeValue,
  fieldType,
  disabled,
  disableOpenPicker,
  handleChangeTimeValue,
  ...other
}: IProps & TextFieldProps) {
  const { control } = useFormContext();

  const timeValueStart = dayjs(new Date()).format("YYYY-MM-DD") + "T" + timeConverterNumberForTime(timeValue);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...otherFields }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
          <DesktopTimePicker
            {...otherFields}
            value={new Date(timeValueStart)}
            disabled={disabled}
            ampm={false}
            disableOpenPicker={disableOpenPicker}
            onChange={(value: any) => handleChangeTimeValue(day_num, timeConverter(dayjs(value).format("HH:mm")), fieldType)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
                variant="standard"
                {...other}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
