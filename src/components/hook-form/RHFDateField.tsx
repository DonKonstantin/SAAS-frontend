// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export default function RHFDateField({
                                       name,
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