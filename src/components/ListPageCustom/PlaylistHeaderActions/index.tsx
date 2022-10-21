import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Stack, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DragAndDropComponent from "./DragAndDropComponent";
import { useEntityList } from "context/EntityListContext";
import { distinctUntilChanged } from "rxjs";

/**
 * Активный компонент для заголовка листинга плэйлистов
 * @returns
 */
const PlaylistHeaderActions: FC<ListHeaderProps> = () => {
  const { t } = useTranslation();

  const { reloadedListingData } = useEntityList(
    distinctUntilChanged(() => true)
  );

  const [open, setOpen] = useState<boolean>(false);

  const openImportHandler = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onCloseHandler = useCallback(() => {
    reloadedListingData();

    setOpen(false);
  }, [setOpen, reloadedListingData]);

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
