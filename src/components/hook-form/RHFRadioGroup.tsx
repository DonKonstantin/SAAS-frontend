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
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  options: string[];
  getOptionLabel?: string[];
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

export default function RHFRadioGroup({
                                        name,
                                        options,
                                        getOptionLabel,
                                        sx,
                                        disabled,
                                      }: IProps & RadioGroupProps) {
  const { control } = useFormContext();
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio sx={sx} disabled={disabled}/>}
                label={getOptionLabel?.length ? t(getOptionLabel[index]) : option}
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
