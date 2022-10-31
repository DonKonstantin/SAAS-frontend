// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Radio,
  RadioGroup,
  FormHelperText,
  RadioGroupProps,
  FormControlLabel, Theme,
} from '@mui/material';
import { SxProps } from "@mui/system";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  options: string[];
  getOptionLabel?: string[];
  sx?: SxProps<Theme>
}

export default function RHFRadioGroup({
                                        name,
                                        options,
                                        getOptionLabel,
                                        sx
                                      }: IProps & RadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row >
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio sx={sx}/>}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
