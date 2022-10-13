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

  const { data, reloadedListingData } = useEntityList(distinctUntilKeyChanged("data"));

  const notificatins = notificationsDispatcher();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);

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
          message: t('project-playlists.notifications.refresh-campaigns.error'),
          type: "error",
        });

        setIsRefreshing(false);

        return
      }

      notificatins.dispatch({
        message: t('project-playlists.notifications.refresh-campaigns.success'),
        type: "success",
      });

      setIsRefreshing(false);
    } catch (error) {
      notificatins.dispatch({
        message: t('project-playlists.notifications.refresh-campaigns.error'),
        type: "error",
      });

      setIsRefreshing(false);
    }
  }, [checkedItems, data, projectPlaylistService, notificatins, setIsRefreshing]);

  /**
   * Обработчик кнопки создания копии плейлиста(ов)
   */
  const copyHandler = useCallback(async () => {
    setIsCopying(true);

    const selectedPlaylistsRows = data?.currentData.rows.filter(row => checkedItems.some(item => item === row.primaryKeyValue));

    const playlistIds = selectedPlaylistsRows?.map(playlist => playlist.primaryKeyValue) || [];
    
    try {
      const { files } = await projectPlaylistService().getFiles(playlistIds);

      const inputPlaylists = selectedPlaylistsRows?.map(playlist => {
        const columnValues = playlist.columnValues;

        const playlistFiles = files
        .filter(file => file.id === playlist.primaryKeyValue)[0].files
        .map(file => ({
          id: Number(file.id),
          volume: file.volume,
          fileId: Number(file.file_id),
          sort: file.sort,
        }));

        return {
          files: playlistFiles,
          projectId: columnValues.project_id.value,
          name: `COPY ${columnValues.name.value}`,
          isOverallVolume: columnValues.is_overall_volume.value,
          overallVolume: columnValues.overall_volume.value,
        };
      }) || [];

      await projectPlaylistService().copyPlaylists(inputPlaylists);

      notificatins.dispatch({
        message: t(`project-playlists.notifications.copy.${playlistIds.length > 1 ? 'multiple' : 'single'}-playlist.success`),
        type: "success",
      });

      reloadedListingData();

      setIsCopying(false);
    } catch (error) {
      notificatins.dispatch({
        message: t(`project-playlists.notifications.copy.${playlistIds.length > 1 ? 'multiple' : 'single'}-playlist.error`),
        type: "error",
      });

      setIsCopying(false);
    }
  }, [checkedItems, setIsCopying]);

  return (
    <Stack direction="row" columnGap={1.5}>
      <Button variant="outlined" onClick={refreshHandler} disabled={isRefreshing}>
        {t("project-playlists.button.refresh-linked-campaigns")}
      </Button>
      <Button variant="outlined" onClick={copyHandler} disabled={isCopying || !checkedItems.length}>
        {t("project-playlists.button.copy-playlist")}
      </Button>
    </Stack>
  );
};

export default memo(PlaylistActions);
