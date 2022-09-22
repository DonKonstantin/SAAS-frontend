import React, { FC, memo, useCallback, useState, Fragment } from "react";
import { Paper, Stack, Box, Button, Typography } from "@mui/material";
import DropZoneArea from "../../DropZoneArea";
import { useTranslation } from "react-i18next";
import { metadataToMediaInfo } from "components/MediaLibraryUploadPage/MediaUploadArea";
import * as mmb from "music-metadata-browser";

interface Props {
  onClose: VoidFunction;
}

const makeMediaFileInfo = async (file: File) => {
  const metadata = await mmb.parseBlob(file, { skipPostHeaders: true });
  console.log(metadata);
  return metadataToMediaInfo(metadata);
};

const DragAndDropComponent: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();

  const [showResult, setShowResult] = useState<boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      console.log(acceptedFiles, "acceptedFiles");
    },
    [makeMediaFileInfo]
  );

  return (
    <Paper
      sx={{
        p: 5,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50vw",
      }}
    >
      {!showResult && (
        <Fragment>
          <DropZoneArea iconSize={18} onDrop={onDrop} accept={'application/json'} />
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: 2.5 }}
          >
            <Box>
              <Typography variant="body1" color="primary">
                {t("project-playlists.import-playlist.drop-step.text-header")}
              </Typography>
              <Typography variant="caption">
                {t("project-playlists.import-playlist.drop-step.text")}
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ height: 36 }} onClick={onClose}>
              {t("project-playlists.button.cancel")}
            </Button>
          </Stack>
        </Fragment>
      )}
      {showResult && (
        <Fragment>
          <Typography>
            {t("project-playlists.epsent-tracks.header")}
          </Typography>
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={onClose}>
              {t("project-playlists.button.accept")}
            </Button>
          </Stack>
        </Fragment>
      )}
    </Paper>
  );
};

export default memo(DragAndDropComponent);
