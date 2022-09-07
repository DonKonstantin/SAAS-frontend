import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEntityEdit } from "context/EntityEditContext";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilKeyChanged } from "rxjs";
import { EditFormGroupProperties } from "settings/pages/system/edit";

const ObjectPassportAddComponent: FC<EditFormGroupProperties> = ({
  config,
}) => {
  const { fields, isVisible = () => true, sizes = { xs: 12 } } = config;

  const { t } = useTranslation();

  const { entityData } = useEntityEdit(distinctUntilKeyChanged("entityData"));

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
        <Paper sx={{ width: "100%", p: 5, pt: 2.5 }}>
          <Box sx={{ pl: 1.25, pt: 1.75, pb: 3 }}>
            <Typography color="primary">
              {t(`objects-passport-list.add.header`)}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            {fields
              .slice(0, 7)
              .map(({ field, size = { xs: 12 }, component: Component }) => (
                <Grid item {...size} key={`${field}-grid`}>
                  <Component key={field} fieldCode={field} />
                </Grid>
              ))}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("objects-passport-list.edit.fields.rao")}
              </Typography>
            </Grid>
            {fields
              .slice(7, 13)
              .map(({ field, size = { xs: 12 }, component: Component }) => (
                <Grid item {...size} key={`${field}-grid`}>
                  <Component key={field} fieldCode={field} />
                </Grid>
              ))}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("objects-passport-list.edit.fields.vois")}
              </Typography>
            </Grid>
            {fields
              .slice(-4)
              .map(({ field, size = { xs: 12 }, component: Component }) => (
                <Grid item {...size} key={`${field}-grid`}>
                  <Component key={field} fieldCode={field} />
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default memo(ObjectPassportAddComponent);
