import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEntityEdit } from "context/EntityEditContext";
import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditFormGroupProperties } from "settings/pages/system/edit";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { FileList } from "./FileList";

const StyledPaper = styled(Paper)({
  padding: "20px 40px",
});

const StyledGrid = styled(Grid)({
  marginTop: "15px",
});

const EditProjectPlaylist: FC<EditFormGroupProperties> = ({ config }) => {
  const { fields, isVisible = () => true, sizes = { xs: 12 } } = config;

  const { t } = useTranslation();

  const [isOverallVolume, setIsOverallVolume] = useState<boolean>(false);
  const [overallVolume, setOverallVolume] = useState<number>(0);

  const { entityData } = useEntityEdit();

  if (!entityData) {
    return null;
  }

  const { values } = entityData;

  if (!isVisible(values)) {
    return null;
  }

  const onChangeIsOveralVolume = (_, checked: boolean) => {
    setIsOverallVolume(checked);

    if (checked) {
      setOverallVolume(100);
    }
  };

  const onChangeOveralVolume = (_, value: number) => {
    setOverallVolume(value);
  };

  const NameComponent = fields.filter((field) => field.field === "name")[0]
    .component;

  return (
    <Grid item {...sizes}>
      <StyledPaper>
        <Grid container columns={12}>
          <Grid item xs={12}>
            <Stack sx={{ flexDirection: "row" }}>
              <Typography sx={{ minWidth: "300px" }}>
                {t("project-playlists.edit.field.name-title")}
              </Typography>
              <Box sx={{ width: "300px" }}>
                <NameComponent fieldCode="name" />
              </Box>
            </Stack>
          </Grid>
          <StyledGrid item xs={12}>
            <Stack sx={{ flexDirection: "row" }}>
              <FormGroup>
                <FormControlLabel
                  color="primary"
                  control={
                    <Checkbox
                      checked={isOverallVolume}
                      onChange={onChangeIsOveralVolume}
                      size="medium"
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 12, lineHeight: 1.2 }}>
                      {t("project-playlists.edit.field.is-overall-volume")}
                    </Typography>
                  }
                  sx={{ mr: "7px" }}
                />
              </FormGroup>
              {isOverallVolume && (
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  sx={{ minWidth: 150 }}
                >
                  <VolumeMuteIcon sx={{ opacity: 0.54 }} />
                  <Slider
                    size="small"
                    value={overallVolume}
                    onChange={onChangeOveralVolume}
                    sx={{ ml: "7px !important" }}
                  />
                  <VolumeUp sx={{ ml: "14px !important", opacity: 0.54 }} />
                  <Typography
                    sx={{
                      ml: "7px !important",
                      fontSize: 13,
                      minWidth: 25,
                      maxWidth: 25,
                    }}
                  >
                    {overallVolume}%
                  </Typography>
                </Stack>
              )}
            </Stack>
          </StyledGrid>
          <StyledGrid
            item
            xs={12}
            sx={{ height: "51px", display: "flex", alignItems: "center" }}
          >
            <Typography color="primary">
              {t("project-playlists.edit.field.track-list.header")}
            </Typography>
          </StyledGrid>
          <Grid item xs={12}>
            <FileList/>
          </Grid>
        </Grid>
      </StyledPaper>
    </Grid>
  );
};

export default memo(EditProjectPlaylist);
