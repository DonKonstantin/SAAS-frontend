import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Stack } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DragAndDropComponent from "./DragAndDropComponent";

/**
 * 
 * @returns 
 */
const PlaylistHeaderActions: FC<ListHeaderProps> = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const openImportHandler = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <Stack direction="row" justifyContent="flex-end" sx={{pb: 2.5}}>
      <Button variant="outlined" onClick={openImportHandler} startIcon={<CloudUploadIcon />}>
        {t("project-playlists.button.open-import-playlist")}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <DragAndDropComponent onClose={() => setOpen(false)}/>
      </Modal>
    </Stack>
  );
};

export default memo(PlaylistHeaderActions);
