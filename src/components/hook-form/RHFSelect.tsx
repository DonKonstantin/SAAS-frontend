// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  children: any;
}

export function RHFSelect({ name, children, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}