import { Stack, Typography } from "@mui/material";
import React, { FC, memo } from "react";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import RHFSlider from "components/hook-form/RHFSlider";
import { useFormContext } from "react-hook-form";
import { RHFCheckbox } from "components/hook-form";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const StyledVolumeValue = styled(Typography)({
  marginLeft: "7px !important",
  fontSize: 13,
  minWidth: 25,
  maxWidth: 25,
});

const StyledVolumeUpIcon = styled(VolumeUp)({
  marginLeft: "14px !important", 
  opacity: 0.54,
});

/**
 * Компонент общей громкости плэйлиста
 * @returns 
 */
const OveralValue: FC = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const isOverallVolume = watch('isOverallVolume');
  const overallVolume = watch('overallVolume');

  return (
    <Stack direction="row">
      <RHFCheckbox
        name="isOverallVolume"
        label={<Typography sx={{ fontSize: 12 }}>{t("edit-campaign-playlist.field.is-over-valume")}</Typography>}
      />
      {isOverallVolume && (
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{ minWidth: 150 }}
        >
          <VolumeMuteIcon sx={{ opacity: 0.54 }} />
          <RHFSlider
            name="overallVolume"
            size="small"
            sx={{ ml: "3px !important" }}
          />
          <StyledVolumeUpIcon/>
          <StyledVolumeValue>{overallVolume}%</StyledVolumeValue>
        </Stack>
      )}
    </Stack>
  );
};

export default memo(OveralValue);
