// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export default function RHFTextField({ name, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          if (other.type === 'number') {
            return parseInt(e.target.value) < 0 ? 0 : e.target.value
          }

          return e.target.value
        }

        return (
          <TextField {...field}
                     variant="standard"
                     fullWidth
                     error={!!error}
                     helperText={error?.message}
                     onChange={e => field.onChange(handleChange(e))}
                     {...other}
                     />
        )
      }}
    />
  );
}