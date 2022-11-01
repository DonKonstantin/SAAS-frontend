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
  inputFormat?: string
}

export default function RHFDateField({
                                       name,
                                       inputFormat,
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
                inputProps={
                  {
                    ...params.inputProps,
                    placeholder: inputFormat ?? params.inputProps?.placeholder
                  }
                }
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}