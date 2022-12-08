import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useState } from "react";
import { Button, Stack, Tooltip } from "@mui/material";
import ListPageCreationButton from "components/ListPageParts/ListPageCreationButton";
import { useTranslation } from "react-i18next";
import { useEntityList } from "context/EntityListContext";
import { distinctUntilKeyChanged } from "rxjs";
import { notificationsDispatcher } from "services/notifications";
import { campaignListService } from "services/campaignListService";
import { LoadingButton } from "@mui/lab";

/**
 * Компонент кнопок действий листинга кодов плеера
 * @param param0
 * @returns
 */
const CampaignsActions: FC<ListHeaderProps> = ({ checkedItems }) => {
  const { t } = useTranslation();

  const notifications = notificationsDispatcher();

  const [copyLoading, setCopyLoading] = useState<boolean>(false);
  const [publishLoading, setPublishLoading] = useState<boolean>(false);
  const [depublishLoading, setDepublishLoading] = useState<boolean>(false);

  const { reloadedListingData, data } = useEntityList(
    distinctUntilKeyChanged("data")
  );

  if (!data) {
    return null;
  }

  const { currentData } = data;

  const selectedRows = currentData.rows.filter((value) =>
    checkedItems.some((v) => v === value.columnValues.id.value)
  );

  const channels = currentData.additionData.map((item) => item.channels);

  const onCopyHandler = async () => {
    setCopyLoading(true);

    try {
      const campaigns = await campaignListService().getCampaignsArrayByIds(
        selectedRows.map((row) => row.primaryKeyValue)
      );

      await Promise.all(
        campaigns.map((campaign) => {
          const channels = campaign.channels.map((channel) => ({
            id: Number(channel.id),
            channel_id: Number(channel.channel_id),
          }));

          const playlists = campaign.playlists.map((playlist) => ({
            projectPlaylistId: playlist.projectPlaylistId,
            playCounter: playlist.playCounter,
            periodStop: playlist.periodStop,
            shuffle: playlist.shuffle,
            periodStart: playlist.periodStart,
            daysType: playlist.daysType,
            sortOrder: playlist.sortOrder,
            isCampaignTimetable: playlist.isCampaignTimetable,
            allDaysStartMinutes: playlist.allDaysStartMinutes,
            allDaysStopMinutes: playlist.allDaysStopMinutes,
            campaignPlaylistId: playlist.campaignPlaylistId,
            days: playlist.days.map((day) => ({
              dayNum: day.dayNum,
              isActive: day.isActive,
              daysStartMinutes: day.daysStartMinutes,
              daysStopMinutes: day.daysStopMinutes,
              id: Number(day.id),
            })),
            id: Number(playlist.id),
          }));

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
            campaign_play_tracks_quantity: Number(
              campaign.campaign_play_tracks_quantity
            ),
            campaign_all_days_start_minutes: Number(
              campaign.campaign_all_days_start_minutes
            ),
            campaign_all_days_stop_minutes: Number(
              campaign.campaign_all_days_stop_minutes
            ),
            campaign_days_type: campaign.campaign_days_type,
            campaign_end_type: campaign.campaign_end_type,
            campaign_low_priority_end_type:
              campaign.campaign_low_priority_end_type,
            campaign_period_start: new Date(campaignPlaylistsPeriodStart),
            campaign_period_stop: new Date(campaignPlaylistsPeriodStop),
            campaign_play_order: campaign.campaign_play_order,
            campaign_play_tracks_period_type:
              campaign.campaign_play_tracks_period_type,
            campaign_play_tracks_period_value: Number(
              campaign.campaign_play_tracks_period_value
            ),
            campaign_play_type: campaign.campaign_play_type,
            campaign_priority: campaign.campaign_priority,
            campaign_type: campaign.campaign_type,
            channels,
            days: campaign.days.map((day) => ({
              day_num: day.day_num,
              is_active: day.is_active,
              days_start_minutes: day.days_start_minutes,
              days_stop_minutes: day.days_stop_minutes,
              id: day.id,
            })),
            playlists,
            project_id: campaign.project_id,
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

          setCopyLoading(true);

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

          setCopyLoading(true);
        });
    } catch (error) {
      notifications.dispatch({
        message: t(`pages.campaign.notifications.campaign-copy.error`),
        type: "error",
      });

      setCopyLoading(true);
    }
  };

  const onPublishHandler = async () => {
    setPublishLoading(true);

    try {
      await Promise.all([
        checkedItems.map((campaignId) => {
          return campaignListService().publishCampaign({
            campaignId,
            channelIds: channels
              .find((item) => item[0].campaign_id === campaignId)
              .map((channel) => channel.channel_id),
          });
        }),
      ])
        .then(() => {
          notifications.dispatch({
            message: t(
              `pages.campaign.notifications.campaign-publish.succeess.${
                checkedItems.length === 1 ? "single" : "multiple"
              }`
            ),
            type: "success",
          });

          setPublishLoading(false);

          reloadedListingData();
        })
        .catch(() => {
          notifications.dispatch({
            message: t(
              `pages.campaign.notifications.campaign-publish.reject.${
                checkedItems.length === 1 ? "single" : "multiple"
              }`
            ),
            type: "error",
          });
          
          setPublishLoading(false);
        });
    } catch (error) {
      notifications.dispatch({
        message: t(`pages.campaign.notifications.campaign-publish.error`),
        type: "error",
      });
      
      setPublishLoading(false);
    }
  };

  const onDepublishHandler = () => {
    setDepublishLoading(true);
    setDepublishLoading(false);
  };

  const buttonTooltip = !selectedRows.length || publishLoading || depublishLoading 
    ? `pages.campaign.tooltip.button.${!selectedRows.length ? "is-loading" : ""}${publishLoading || depublishLoading || copyLoading ? "no-selected" : ""}`
    : "";

  return (
    <Stack direction="row" columnGap={"15px"}>
      <ListPageCreationButton
        buttonTitle={t("pages.campaign.button.create")}
        disabled={copyLoading || publishLoading || depublishLoading}
      />
      <Tooltip title={copyLoading ? "" : t(buttonTooltip)}>
        <LoadingButton
          loading={copyLoading}
          variant="outlined"
          onClick={onCopyHandler}
          disabled={!selectedRows.length || publishLoading || depublishLoading}
        >
          {t("pages.campaign.button.copy")}
        </LoadingButton>
      </Tooltip>
      <Tooltip title={publishLoading ? "" : t(buttonTooltip)}>
        <LoadingButton
          loading={publishLoading}
          variant="outlined"
          onClick={onPublishHandler}
          disabled={!selectedRows.length || copyLoading || depublishLoading}
        >
          {t("pages.campaign.button.publish")}
        </LoadingButton>
      </Tooltip>
      <Tooltip title={depublishLoading ? "" : t(buttonTooltip)}>
        <LoadingButton
          loading={depublishLoading}
          variant="outlined"
          color="error"
          onClick={onDepublishHandler}
          disabled={!selectedRows.length || copyLoading || publishLoading}
        >
          {t("pages.campaign.button.deselect")}
        </LoadingButton>
      </Tooltip>
    </Stack>
  );
};

export default memo(CampaignsActions);
