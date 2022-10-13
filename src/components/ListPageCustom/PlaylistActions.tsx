import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useCallback, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEntityList } from "context/EntityListContext";
import { distinctUntilKeyChanged } from "rxjs";
import projectPlaylistService from "services/projectPlaylistService";
import { notificationsDispatcher } from "services/notifications";

/**
 * Компонент кнопок действий листинга кодов плеера
 * @param param0
 * @returns
 */
const PlaylistActions: FC<ListHeaderProps> = ({ checkedItems }) => {
  const { t } = useTranslation();

  const { data } = useEntityList(distinctUntilKeyChanged("data"));

  const notificatins = notificationsDispatcher();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  /**
   * Обработчик кнопки обновления связных компаний
   */
  const refreshHandler = useCallback(async () => {
    setIsRefreshing(true);

    const playerIds = data?.currentData.rows.map(row => row.columnValues.id.value) || [];

    try {
      const response = await projectPlaylistService().refreshCampaigns(playerIds);

      if (!response) {
        notificatins.dispatch({
          message: t('project-playlists.notificatins.refresh-campaigns.error'),
          type: "error",
        });

        setIsRefreshing(false);

        return
      }

      notificatins.dispatch({
        message: t('project-playlists.notificatins.refresh-campaigns.success'),
        type: "success",
      });

      setIsRefreshing(false);
    } catch (error) {
      notificatins.dispatch({
        message: t('project-playlists.notificatins.refresh-campaigns.error'),
        type: "error",
      });

      setIsRefreshing(false);
    }
  }, [checkedItems, data, projectPlaylistService, notificatins, setIsRefreshing]);

  const copyHandler = useCallback(() => {
    console.log(checkedItems, "checkedItems");
  }, [checkedItems]);

  return (
    <Stack direction="row" columnGap={1.5}>
      <Button variant="outlined" onClick={refreshHandler} disabled={isRefreshing}>
        {t("project-playlists.button.refresh-linked-campaigns")}
      </Button>
      <Button variant="outlined" onClick={copyHandler}>
        {t("project-playlists.button.copy-playlist")}
      </Button>
    </Stack>
  );
};

export default memo(PlaylistActions);
