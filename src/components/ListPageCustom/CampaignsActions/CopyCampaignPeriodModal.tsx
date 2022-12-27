import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { campaignListService } from "services/campaignListService";
import { ListFieldRow } from "services/listDataLoader/listLoader/types";
import { notificationsDispatcher } from "services/notifications";
import { Schemas } from "settings/schema";
import { prepareCampaignDataForStore } from "./helpers";

interface Props {
  selectedCampaigns: ListFieldRow<keyof Schemas>[];
  onClose: VoidFunction;
  reloadedListingData: VoidFunction;
};

const CopyCampaignPeriodModal: FC<Props> = props => {
  const { selectedCampaigns, onClose, reloadedListingData } = props;

  const { t } = useTranslation();

  const [copyLoading, setCopyLoading] = useState<boolean>(false);

  const notifications = notificationsDispatcher();

  const onCopyHandler = async () => {
    setCopyLoading(true);

    try {
      const campaigns = await campaignListService().getCampaignsArrayByIds(
        selectedCampaigns.map((row) => row.primaryKeyValue)
      );

      await Promise.all(
        campaigns.map((campaign) => {
          const preparedCampaign = prepareCampaignDataForStore(campaign);

          const campaignPlaylistsPeriodStart = Math.min(
            ...campaign.playlists.map((playlist) =>
              new Date(playlist.periodStart).getTime()
            )
          );
          const campaignPlaylistsPeriodStop = Math.min(
            ...campaign.playlists.map((playlist) =>
              new Date(playlist.periodStop).getTime()
            )
          );

          return campaignListService().storeCampaign({
            ...preparedCampaign,
            campaign_period_start: !!campaign.playlists.length
              ? new Date(campaignPlaylistsPeriodStart)
              : new Date(),
            campaign_period_stop: !!campaign.playlists.length
              ? new Date(campaignPlaylistsPeriodStop)
              : new Date(),
            campaign_type: "mute",
            channels: [],
            name: `${t("pages.campaign.copy-prefix")} ${campaign.name}`,
          });
        })
      )
        .then(() => {
          notifications.dispatch({
            message: t(
              `pages.campaign.notifications.campaign-copy.succeess.${
                campaigns.length === 1 ? "single" : "multiple"
              }`
            ),
            type: "success",
          });

          reloadedListingData();
        })
        .catch(() => {
          notifications.dispatch({
            message: t(
              `pages.campaign.notifications.campaign-copy.reject.${
                campaigns.length === 1 ? "single" : "multiple"
              }`
            ),
            type: "error",
          });
        });
    } catch (error) {
      notifications.dispatch({
        message: t(`pages.campaign.notifications.campaign-copy.error`),
        type: "error",
      });

      setCopyLoading(true);
    } finally {
      setCopyLoading(false);
    }
  };

  return (
    <>
      
    </>
  );
};

export default memo(CopyCampaignPeriodModal);
