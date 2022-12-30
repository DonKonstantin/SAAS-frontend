import DropZoneArea from "components/DropZoneArea";
import React, { FC, memo, Fragment } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  onDrop: (acceptedFiles: File[]) => void;
  onClose: VoidFunction;
}

/**
 * Компонент обработки импорта плэйлиста
 * @param param0
 * @returns
 */
const ExportBlock: FC<Props> = ({ onDrop, onClose }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <DropZoneArea
        customInputText={t(
          "project-playlists.import-playlist.drop-step.input-text"
        )}
        iconSize={18}
        onDrop={onDrop}
        accept={"application/json"}
        height={192}
      />
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2.5 }}>
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
  );
};

export default memo(ExportBlock);
