// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Slider, SliderProps } from "@mui/material";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export default function RHFSlider({
  name,
  ...other
}: IProps & SliderProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Slider
          {...field}
          {...other}
        />
      )}
    />
  );
}
