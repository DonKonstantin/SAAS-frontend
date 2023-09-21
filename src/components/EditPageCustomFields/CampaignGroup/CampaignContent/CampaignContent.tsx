import React, { FC, memo } from 'react';
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import RHFRadioGroup from "../../../hook-form/RHFRadioGroup";
import PlayListContent from "./CampaignPlayListContent";
import CampaignMediaFilesUpload from './CampaignMediaFilesUpload';
import CampaignContentTable from "./CampaignContentTable/CampaignContentTable";
import { useCampaignEditContext } from "../../../../context/CampaignEditContext/useCampaignEditContext";
import { distinctUntilChanged } from "rxjs";
import { isEqual } from "lodash";
import { timeConverterNumberForTime } from "../../../timeConverter";
import { CampaignPlaylistConnect } from "../../../../services/campaignListService/types";
import LoadingBlurEffect from "../CommonComponents/LoadingBlurEffect/LoadingBlurEffect";

/**
 * Компонент вкладки контента в форме редактирования кампании
 * @returns
 */
const CampaignContent: FC = () => {

  const { t } = useTranslation()

  const { campaign, isLoading } = useCampaignEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        prev.isLoading === curr.isLoading &&
        isEqual(prev.campaign, curr.campaign)
    )
  );

  if (!campaign) {
    return <></>;
  }

  const countTimePlaylists = campaign.playlists
    .reduce((acc, playlist: CampaignPlaylistConnect & { duration: number }) => acc + playlist.duration, 0);

  const formatTime = timeConverterNumberForTime(countTimePlaylists);

  const countTracks = campaign.playlists
    .reduce((acc, playlist: CampaignPlaylistConnect & { files: [] }) => acc + playlist.files.length, 0);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={4} sx={{ mb: "42px" }} alignItems="center">
          <Grid item xs={2.5}>
            {t("pages.campaign.edit.fields.content.campaign_play_order.title")}
          </Grid>

          <Grid item xs={9.5}>
            <RHFRadioGroup
              name='campaign_play_order'
              options={['mix', "byOrder"]}
              getOptionLabel={
                [
                  "pages.campaign.edit.fields.content.campaign_play_order.mix",
                  "pages.campaign.edit.fields.content.campaign_play_order.byOrder"
                ]}
              sx={{ p: "0 9px" }}
            />
          </Grid>

          <Grid item xs={2.5}>
            {t("pages.campaign.edit.fields.content.continues")}
          </Grid>

          <Grid item xs={9.5}>
            {formatTime}
          </Grid>

          <Grid item xs={2.5}>
            {t("pages.campaign.edit.fields.content.trackCount")}
          </Grid>

          <Grid item xs={9.5}>
            {countTracks}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <LoadingBlurEffect isLoading={isLoading}>
          <PlayListContent />
          <CampaignMediaFilesUpload />
          <CampaignContentTable />
        </LoadingBlurEffect>
      </Grid>
    </Grid>
  );
};

export default memo(CampaignContent);
