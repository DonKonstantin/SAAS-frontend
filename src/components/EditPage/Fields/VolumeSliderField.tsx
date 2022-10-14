import { Slider, Stack, Typography } from "@mui/material";
import React, { FC, memo } from "react";
import { EditFieldProperties } from "settings/pages/system/edit";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import useEntityEditField from "./useEntityEditField";
import { distinctUntilChanged } from "rxjs";

const VolumeSliderField: FC<EditFieldProperties> = (props) => {
  const { fieldCode } = props;
  console.log("Hey");

  const fieldData = useEntityEditField(
    fieldCode,
    distinctUntilChanged((previous, current) => {
      return (
        previous?.entityData?.values[fieldCode] ===
          current?.entityData?.values[fieldCode] &&
        previous?.validation[fieldCode] === current?.validation[fieldCode]
      );
    })
  );

  if (!fieldData) {
    return null;
  }

  const {
    value,
    fieldConfig: { isVisible = () => true },
    values,
    onChangeFieldValue,
  } = fieldData;

  if (!isVisible(values)) {
    return null;
  }

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <VolumeMuteIcon />
      <Slider
        size="small"
        value={value as number}
        onChange={(_, value) => onChangeFieldValue(() => value)}
      />
      <VolumeUp />
      <Typography>
        {value}%
      </Typography>
    </Stack>
  );
};

export default memo(VolumeSliderField);
