import React, { FC, memo } from 'react';
import { Box } from "@mui/material";
import RHFTimeField from "../../../../hook-form/RHFTimeField";

type Props = {
  day_num: number
  nameFieldDays: string;
  arrayFieldIndex: number;
  days_start_minutes: number;
  days_stop_minutes: number;
  disabled?: boolean;
  disableOpenPicker?: boolean;
  handleChangeTimeValue(id: number, time: any, field: "start" | "end"): void;
}

const TimePickerComponent: FC<Props> = (props) => {

  const {
    day_num,
    nameFieldDays,
    arrayFieldIndex,
    days_start_minutes,
    days_stop_minutes,
    disabled,
    disableOpenPicker,
    handleChangeTimeValue,
  } = props

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", columnGap: '14px' }}>
      <RHFTimeField
        name={`${nameFieldDays}[${arrayFieldIndex}].days_start_minutes`}
        day_num={day_num}
        timeValue={days_start_minutes}
        handleChangeTimeValue={handleChangeTimeValue}
        fieldType="start"
        sx={{ maxWidth: "99px" }}
        disabled={disabled}
        disableOpenPicker={disableOpenPicker}
      />
      <Box sx={{ maxWidth: "4px", width: "100%", alignSelf: "flex-start", mt: "3px" }}>-</Box>
      <RHFTimeField
        name={`${nameFieldDays}[${arrayFieldIndex}].days_stop_minutes`}
        day_num={day_num}
        timeValue={days_stop_minutes}
        handleChangeTimeValue={handleChangeTimeValue}
        fieldType="end"
        sx={{ maxWidth: "99px" }}
        disabled={disabled}
        disableOpenPicker={disableOpenPicker}
      />
    </Box>
  )
}

export default memo(TimePickerComponent)