import React, { memo } from 'react';
import { Grid } from "@mui/material";
import StringField from "../../../EditPage/Fields/StringField";
import RadioEnumButton from "../../../EditPage/Fields/RadioEnumButton";
import { useEntityEdit } from "../../../../context/EntityEditContext";
import { distinctUntilChanged } from "rxjs";
import { useTranslation } from "react-i18next";

const CampaignContent = () => {

  const { entityData } = useEntityEdit(distinctUntilChanged())
  if (!entityData) {
    return null
  }

  const { t } = useTranslation()

  const nameAndTypeCompany = [
    {
      name: t("pages.campaign.add.fields.name"),
      component: <StringField fieldCode='name'/>,
      size: { spacing: 4, xs: 2.5, sx: { mb: "16px" } }
    },
    {
      name: t("pages.campaign.add.fields.campaign_type"),
      component: <RadioEnumButton fieldCode='campaign_type'/>,
      size: { spacing: 4, xs: 2.5, sx: { mb: entityData.values.campaign_type === "mute" ? "26.5px" : "36.5px" } }
    }
  ]

    return (
    <Grid container>

      {
        nameAndTypeCompany.map(field => (
          <Grid container spacing={field.size.spacing} sx={field.size.sx} alignItems="center" key={field.name}>
            <Grid item xs={field.size.xs}>
              {field.name}
            </Grid>

            <Grid item>
              {field.component}
            </Grid>
          </Grid>
        ))
      }

    </Grid>

  )
}

export default memo(CampaignContent)