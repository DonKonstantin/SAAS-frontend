import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useState } from "react";
import { Stack, Tooltip } from "@mui/material";
import ListPageCreationButton from "components/ListPageParts/ListPageCreationButton";
import { useTranslation } from "react-i18next";
import { useEntityList } from "context/EntityListContext";
import { distinctUntilKeyChanged } from "rxjs";
import { notificationsDispatcher } from "services/notifications";
import { campaignListService } from "services/campaignListService";
import { LoadingButton } from "@mui/lab";
import { prepareCampaignDataForStore } from "./helpers";
import Button from "@mui/material/Button";

/**
 * Компонент кнопок действий листинга кодов плеера
 * @param param0
 * @returns
 */
const CampaignsActions: FC<ListHeaderProps> = ({
  checkedItems,
  onChangeCheckedItems,
}) => {
  const { t } = useTranslation();

  const notifications = notificationsDispatcher();

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
    try {
      const campaigns = await campaignListService().getCampaignsArrayByIds(
        selectedRows.map((row) => row.primaryKeyValue)
      );

      await Promise.all(
        campaigns.map((campaign) => {
          const preparedCampaign = prepareCampaignDataForStore(campaign);

          return campaignListService().storeCampaign({
            ...preparedCampaign,
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
    }
  };

  const onPublishHandler = async () => {
    setPublishLoading(true);

    const channelsForSelected = channels
      .filter((el) => !!el.length)
      .filter((channel) =>
        checkedItems.some((item) => item === channel[0].campaign_id)
      );

    if (channelsForSelected.length !== checkedItems.length) {
      notifications.dispatch({
        message: t(`pages.campaign.notifications.campaign-publish.no-channels`),
        type: "warning",
      });
    }

    if (!channelsForSelected.length) {
      setPublishLoading(false);

      return;
    }

    const items = checkedItems.filter(
      (id) => !!channelsForSelected.find((item) => item[0].campaign_id === id)
    );

    try {
      await Promise.all(
        items.map((campaignId) => {
          return campaignListService().publishCampaign({
            campaignId,
            channelIds: channels
              .find((item) => item[0]?.campaign_id === campaignId)
              .map((channel) => channel.channel_id),
          });
        })
      )
        .then(() => {
          notifications.dispatch({
            message: t(
              `pages.campaign.notifications.campaign-publish.succeess.${
                checkedItems.length === 1 ? "single" : "multiple"
              }`
            ),
            type: "success",
          });

          reloadedListingData();

          if (typeof onChangeCheckedItems === "function") {
            onChangeCheckedItems([]);
          }
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
        });
    } catch (error) {
      notifications.dispatch({
        message: t(`pages.campaign.notifications.campaign-publish.error`),
        type: "error",
      });
    } finally {
      setPublishLoading(false);
    }
  };

  const onDepublishHandler = async () => {
    setDepublishLoading(true);

    try {
      const campaigns = await campaignListService().getCampaignsArrayByIds(
        selectedRows.map((row) => row.primaryKeyValue)
      );

      await Promise.all(campaigns.map((campaign) => {
        const preparedCampaign = prepareCampaignDataForStore(campaign);

        return campaignListService().storeCampaign({
          ...preparedCampaign,
          id: Number(campaign.id),
          channels: [],
        });
      }))
        .then(() => {
          notifications.dispatch({
            message: t(
              `pages.campaign.notifications.campaign-depublish.succeess.${
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
              `pages.campaign.notifications.campaign-depublish.reject.${
                checkedItems.length === 1 ? "single" : "multiple"
              }`
            ),
            type: "error",
          });
        });
    } catch (error) {
      notifications.dispatch({
        message: t(`pages.campaign.notifications.campaign-depublish.error`),
        type: "error",
      });
    } finally {
      setDepublishLoading(false);
    }
  };

  const buttonTooltip =
    !selectedRows.length || publishLoading || depublishLoading
      ? `pages.campaign.tooltip.button.${
          !selectedRows.length ? "is-loading" : ""
        }${publishLoading || depublishLoading ? "no-selected" : ""}`
      : "";

  return (
    <Stack direction="row" columnGap={"15px"}>
      <ListPageCreationButton
        buttonTitle={t("pages.campaign.button.create")}
        disabled={publishLoading || depublishLoading}
      />

      <Tooltip title={t(buttonTooltip)}>
        <Button
          variant="outlined"
          onClick={onCopyHandler}
          disabled={!selectedRows.length || publishLoading || depublishLoading}
          data-testid="copyCampaignButton"
        >
          {t("pages.campaign.button.copy")}
        </Button>
      </Tooltip>

      <Tooltip title={publishLoading ? "" : t(buttonTooltip)}>
        <LoadingButton
          loading={publishLoading}
          variant="outlined"
          onClick={onPublishHandler}
          disabled={!selectedRows.length || depublishLoading}
          data-testid="publishCampaignButton"
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
          disabled={!selectedRows.length || publishLoading}
          data-testid="deselectCampaignButton"
        >
          {t("pages.campaign.button.deselect")}
        </LoadingButton>
      </Tooltip>
    </Stack>
  );
};

export default memo(CampaignsActions);
