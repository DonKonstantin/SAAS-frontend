import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useEntityEdit } from "context/EntityEditContext";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilKeyChanged } from "rxjs";
import { useRouter } from "next/router";
import { campaignListService } from "../../../../services/campaignListService";
import { notificationsDispatcher } from "../../../../services/notifications";

interface Props {
  checkedItems: string[];
}

const StyledWrapper = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  columnGap: 20,
  alignItems: 'center',
  height: '100%'
});

/**
 * Компонент кнопок действий вкладки каналов на странице редактирования кампании
 * @param param0
 * @returns
 */
const ActionButtons: FC<Props> = ({ checkedItems }) => {
  const { t } = useTranslation();

  const { entityData } = useEntityEdit(distinctUntilKeyChanged("entityData"));

  const router = useRouter();

  const messanger = notificationsDispatcher();

  if (!entityData) {
    return null;
  }


  const onPublishHandler = async () => {

    if (!router.query.entityId) {
      return
    }

    const channelsDataArray = checkedItems.reduce((acc, channelId) => [...acc, Number(channelId)], [])
    const campaignPublishData = {
      campaignId: Number(router.query.entityId),
      channelIds: channelsDataArray
    }

    try {
      await campaignListService().publishCampaign(campaignPublishData)
      messanger.dispatch({
        message: t("edit-campaign-playlist.success.publish-campaign"),
        type: "success",
      });
    } catch (error) {
      messanger.dispatch({
        message: error,
        type: "error",
      });
    }
  };

  return (
    <StyledWrapper>
      <Button
        variant="outlined"
        onClick={onPublishHandler}
        disabled={!checkedItems.length}
      >
        {t("pages.campaign.add.buttons.publish")}
      </Button>
      <Button
        variant="outlined"
        type='submit'
      >
        {t("pages.campaign.add.buttons.save")}
      </Button>
    </StyledWrapper>
  );
};

export default memo(ActionButtons);
