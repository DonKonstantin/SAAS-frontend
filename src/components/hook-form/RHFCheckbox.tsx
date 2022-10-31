// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material';
import React from "react";

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
}

export function RHFCheckbox({ name, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value}/>}
        />
      }
      {...other}
    />
  );
}