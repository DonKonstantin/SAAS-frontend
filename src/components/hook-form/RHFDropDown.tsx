// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  options: {
    name: string
    label?: string
  }[];
}

export default function RHFDropDown({ name,
                            options,
                            ...other }: IProps & TextFieldProps) {
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
          variant="standard"
          {...other}
        >
          {options.map(option => (
            <MenuItem value={option.name} key={option.name}>{option.label ?? option.name}</MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}