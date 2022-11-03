import React, { memo } from 'react';
import { Grid, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import RHFRadioGroup from "../../../hook-form/RHFRadioGroup";
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import PlayListContent from "./CampaignPlayListContent";
import CampaignMediaFilesUpload from './CampaignMediaFilesUpload';
import CampaignContentTable from "./CampaignContentTable/CampaignContentTable";

const nameAndTypeCompany = [
  {
    name: "pages.campaign.edit.fields.content.campaign_play_order.title",
    component: <RHFRadioGroup
      name='campaign_play_order'
      options={['mix', "byOrder"]}
      getOptionLabel={
        [
          "pages.campaign.edit.fields.content.campaign_play_order.mix",
          "pages.campaign.edit.fields.content.campaign_play_order.byOrder"
        ]}
      sx={{ p: "0 9px" }}
    />,
    size: { spacing: 4, xs: 2.5, sx: { mb: "42px" } }
  },
  {
    name: "pages.campaign.edit.fields.content.continues",
    component: <TextField
      value={'10:00'}
      variant="standard"
      fullWidth
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <AccessTimeSharpIcon/>
          </InputAdornment>
      }}
      sx={{ maxWidth: "99px" }}
    />,
    size: { spacing: 4, xs: 2.5, sx: { mb: "31px" } }
  },
  {
    name: "pages.campaign.edit.fields.content.trackCount",
    component: <TextField
      value={1}
      variant="standard"
      fullWidth
      sx={{ maxWidth: "99px" }}
      type='number'
    />,
    size: { spacing: 4, xs: 2.5, sx: { mb: "50px" } }
  }
]

const CampaignContent = () => {

  const { t } = useTranslation()

  return (
    <Grid container>
      {
        nameAndTypeCompany.map(field => (
          <Grid container spacing={field.size.spacing} sx={field.size.sx} alignItems="center" key={field.name}>
            <Grid item xs={field.size.xs}>
              {t(field.name)}
            </Grid>
            <Grid item>
              {field.component}
            </Grid>
          </Grid>
        ))
      }

      <PlayListContent/>

      <CampaignMediaFilesUpload/>

      <CampaignContentTable/>
    </Grid>

  )
}

export default memo(CampaignContent)