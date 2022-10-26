import React, { FC, memo } from 'react';
import { DesktopTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import dayjs from "dayjs";
import { Box, Stack, TextField } from "@mui/material";

type Props = {
  day_num: number
  days_start_minutes: number
  days_stop_minutes: number
  handleChangeTimeValue(id: number, time: any, field: "start" | "end"): void
}

const TimePickerCampaignComponent: FC<Props> = (props) => {

  const { day_num, days_start_minutes, days_stop_minutes, handleChangeTimeValue } = props

  const timeValueStart = dayjs(new Date()).format("YYYY-MM-DD") + "T" + dayjs.duration(days_start_minutes, 'm').format("HH:mm");
  const timeValueEnd = dayjs(new Date()).format("YYYY-MM-DD") + "T" + dayjs.duration(days_stop_minutes, 'm').format("HH:mm");

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ maxWidth: "230px", width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
        <DesktopTimePicker
          label={''}
          value={new Date(timeValueStart)}
          ampm={false}
          onChange={(value: any) => handleChangeTimeValue(day_num, dayjs(value).format("HH:mm"), "start")}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ maxWidth: "99px", width: "100%" }}
              variant="standard"
            />
          )}
        />
      </LocalizationProvider>
      <Box sx={{ maxWidth: "4px", width: "100%" }}>-</Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
        <DesktopTimePicker
          label={''}
          value={new Date(timeValueEnd)}
          ampm={false}
          onChange={(value: any) => handleChangeTimeValue(day_num, dayjs(value).format("HH:mm"), "end")}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ maxWidth: "99px", width: "100%" }}
              variant="standard"
            />
          )}
        />
      </LocalizationProvider>
    </Stack>
  )
}

export default memo(TimePickerCampaignComponent)