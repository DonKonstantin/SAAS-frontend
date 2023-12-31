import React, {FC, Fragment, memo} from "react";
import {Button, Divider, Stack, Typography, Box} from "@mui/material";
import {useTranslation} from "react-i18next";
import NotAvailableTracksList from "./NotAvailableTracksList";
import {ExportedPlaylistType} from "services/projectPlaylistService/interfaces";

interface Props {
  dropedPlaylistList: ExportedPlaylistType;
  notAvailables: string[];
  onClose: VoidFunction;
}

/**
 * Компонент выводит отсутствующие при экспорте файлы
 * @param param0
 * @returns
 */
const ExportResultBlock: FC<Props> = ({
  dropedPlaylistList,
  notAvailables,
  onClose,
}) => {
  const { t } = useTranslation();

  const playlistList = Object.keys(dropedPlaylistList)
    .map((key) => {
      const trackList = dropedPlaylistList[key].filter((track) =>
        notAvailables.some((item) => item === track)
      );

      if (!trackList.length) {
        return undefined;
      }

      return <NotAvailableTracksList playlist={key} fileNames={trackList} />;
    })
    .filter((item) => !!item);

  return (
    <Fragment>
      <Typography variant="body1" color="primary">
        {t("project-playlists.epsent-tracks.header")}
      </Typography>
      <Box sx={{maxHeight: 'calc(90vh - 164px)', overflow: 'auto'}}>
        {playlistList}
      </Box>
      <Stack direction="column" alignItems="flex-end">
        <Divider sx={{ width: "100%" }} />
        <Button onClick={onClose} variant="outlined" sx={{ mt: 2.75 }}>
          {t("project-playlists.button.accept")}
        </Button>
      </Stack>
    </Fragment>
  );
};

export default memo(ExportResultBlock);
