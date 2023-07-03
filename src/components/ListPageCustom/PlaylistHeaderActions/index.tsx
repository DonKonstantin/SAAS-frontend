import {ListHeaderProps} from "components/ListPageParts/TableCaption";
import React, {FC, memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Divider, Modal, Stack} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DragAndDropComponent from "./DragAndDropComponent";

/**
 * Активный компонент для заголовка листинга плэйлистов
 * @returns
 */
const PlaylistHeaderActions: FC<ListHeaderProps> = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const openImportHandler = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onCloseHandler = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Stack direction="column" alignItems="flex-end" sx={{ pb: 2.5 }}>
      <Button
        variant="outlined"
        onClick={openImportHandler}
        startIcon={<CloudUploadIcon />}
      >
        {t("project-playlists.button.open-import-playlist")}
      </Button>
      <Divider sx={{ width: "100%", mt: 2.75 }} />
      <Modal open={open} onClose={onCloseHandler}>
        <DragAndDropComponent onClose={onCloseHandler} />
      </Modal>
    </Stack>
  );
};

export default memo(PlaylistHeaderActions);
