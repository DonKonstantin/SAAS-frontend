import React, { memo } from 'react';
import { Grid, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import RHFRadioGroup from "../../../hook-form/RHFRadioGroup";
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import PlayListContent from "./CampaignPlayListContent";
import CampaignMediaFilesUpload from './CampaignMediaFilesUpload';
import CampaignContentTable from "./CampaignContentTable/CampaignContentTable";
import { useCampaignEditContext } from "../../../../context/CampaignEditContext/useCampaignEditContext";
import { distinctUntilChanged } from "rxjs";
import { isEqual } from "lodash";
import { timeConverterNumberForTime } from "../../../timeConverter";
import { CampaignPlaylistConnect } from "../../../../services/campaignListService/types";
import LoadingBlurEffect from "../CommonComponents/LoadingBlurEffect/LoadingBlurEffect";

const CampaignContent = () => {

  const { t } = useTranslation()

  const { campaign, isLoading } = useCampaignEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        prev.isLoading === curr.isLoading &&
        isEqual(prev.campaign, curr.campaign)
    )
  );

  if (!campaign) {
    return <></>
  }

  const countTimePlaylists = campaign.playlists.reduce((acc, playlist: CampaignPlaylistConnect & { duration: number }) => acc + playlist.duration, 0)
  const formatTime = timeConverterNumberForTime(countTimePlaylists)
  const countTracks = campaign.playlists.reduce((acc, playlist: CampaignPlaylistConnect & { files: [] }) => acc + playlist.files.length, 0)

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
        value={formatTime}
        variant="standard"
        fullWidth
        disabled
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
        value={countTracks}
        variant="standard"
        fullWidth
        disabled
        sx={{ maxWidth: "99px" }}
        type='number'
      />,
      size: { spacing: 4, xs: 2.5, sx: { mb: "50px" } }
    }
  ]

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

      <LoadingBlurEffect isLoading={isLoading}>
        <PlayListContent/>
        <CampaignMediaFilesUpload/>
        <CampaignContentTable/>
      </LoadingBlurEffect>
    </Grid>

  )
}

export default memo(CampaignContent)
