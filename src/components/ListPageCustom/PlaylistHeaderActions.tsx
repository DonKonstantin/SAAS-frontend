import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button, Stack } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

/**
 * 
 * @returns 
 */
const PlaylistHeaderActions: FC<ListHeaderProps> = ({checkedItems}) => {
  const { t } = useTranslation();

  const openImportHandler = useCallback(() => {
    console.log(checkedItems, "Hey");
    
  }, []);

  return (
    <Stack direction="row" justifyContent="flex-end" sx={{pb: 2.5}}>
      <Button variant="outlined" onClick={openImportHandler} startIcon={<CloudUploadIcon />}>
        {t("project-playlists.button.open-import-playlist")}
      </Button>
    </Stack>
  );
};

export default memo(PlaylistHeaderActions);
