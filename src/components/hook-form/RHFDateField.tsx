// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";
import * as React from "react";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  inputFormat?: string;
  disabled?: boolean;
  shouldDisableDate?: (day: any) => boolean;
}

export default function RHFDateField({
  name,
  inputFormat,
  disabled,
  shouldDisableDate,
  ...other
}: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            {...field}
            disabled={disabled}
            shouldDisableDate={shouldDisableDate}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
                data-testid="datePicker"
                variant="standard"
                {...other}
                inputProps={{
                  ...params.inputProps,
                  placeholder: inputFormat ?? params.inputProps?.placeholder,
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
