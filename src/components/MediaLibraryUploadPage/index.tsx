import React, { FC, useCallback, useEffect } from "react";
import { Grid, Paper, Stack } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs";
import { Box } from "@mui/system";
import { useMediaLibraryUpload } from "./MediaFilesUploadContext";
import { distinctUntilChanged } from "rxjs";
import MediaFileEditDialog from "../MediaFileEditDialog";
import { useEditMediaFilesModal } from "../MediaFileEditDialog/MediaFileEditDialogContext";
import MediaLibraryUploadLicenseType from "./MediaLibraryUploadLicenseType";
import SelectReplaceFileDialog from "./SelectReplaceFileDialog";
import MediaLibraryFiles from "./MediaLibraryFiles";

const MediaLibraryUploadPage: FC = () => {
  const {
    initMediaFilesUploadContext,
    updateMediaInfoFile,
    setReplacedTargetFile,
  } = useMediaLibraryUpload(distinctUntilChanged(() => true));

  const { initEditFileForm } = useEditMediaFilesModal(distinctUntilChanged(() => true));

  useEffect(() => initMediaFilesUploadContext(), []);
  useEffect(() => initEditFileForm(), []);

  const handleSelectReplacedFile = useCallback((file, targetFileId, force) => {
    setReplacedTargetFile(file, targetFileId, force);
  }, [setReplacedTargetFile]);

  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item sx={{ flex: "1 1 0" }}>
            <Breadcrumbs />
          </Grid>
        </Grid>
      </Box>

      <Stack spacing={2}>
        <Paper sx={{ p: 3 }}>
          <MediaLibraryUploadLicenseType />
        </Paper>

        <MediaLibraryFiles />
      </Stack>

      <MediaFileEditDialog
        onSave={updateMediaInfoFile}
      />

      <SelectReplaceFileDialog
        onSave={handleSelectReplacedFile}
        force
      />
    </>
  )
}

export default MediaLibraryUploadPage;
