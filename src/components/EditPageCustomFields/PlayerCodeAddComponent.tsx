import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEntityEdit } from "context/EntityEditContext";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilKeyChanged } from "rxjs";
import { EditFormGroupProperties } from "settings/pages/system/edit";

const StyledPaper = styled(Paper)({
  width: "100%",
  padding: "20px 40px 70px",
});

const StyledHeader = styled(Box)({
  padding: "10px 14px",
});

const StyledDivider = styled(Divider)({
  paddingTop: 32,
  borderBottom: 2,
  borderColor: "#9F9F9F",
});

const StyledFormGrid = styled(Grid)({
  height: 46,
  display: "flex",
  alignItems: "center",
});

const PlayerCodeAddComponent: FC<EditFormGroupProperties> = ({ config }) => {
  const { fields, isVisible = () => true, sizes = { xs: 12 } } = config;

  const { t } = useTranslation();

  const { entityData } = useEntityEdit(distinctUntilKeyChanged("entityData"));

  const titles = [
    "open_time",
    "close_time",
    "reload_time",
    "code",
    "is_active",
    "project_channels",
  ];

  if (!entityData) {
    return null;
  }

  const { values } = entityData;

  if (!isVisible(values)) {
    return null;
  }

  return (
    <Grid item {...sizes}>
      <Box sx={{ width: "100%" }}>
        <StyledPaper>
          <StyledHeader>
            <Typography color="primary">
              {t(`player-codes.add.header`)}
            </Typography>
          </StyledHeader>
          <StyledDivider />
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={4}>
              <Grid container xs={12}>
                {titles.map((title) => (
                  <StyledFormGrid xs={12}>
                    {t(`player-codes.field-titles.${title}`)}
                  </StyledFormGrid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={8}>
              {fields.map(
                ({ field, size = { xs: 12 }, component: Component }, index) => (
                  <StyledFormGrid
                    item
                    {...size}
                    key={`${field}-grid`}
                    sx={{ pr: index === 3 ? 0 : "50%" }}
                  >
                    <Component key={field} fieldCode={field} />
                  </StyledFormGrid>
                )
              )}
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </Grid>
  );
};

export default memo(PlayerCodeAddComponent);
