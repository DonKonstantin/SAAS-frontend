import React, { FC, memo } from "react";
import MediaUploadArea from "./MediaUploadArea";
import MediaFileTable from "./MediaFileTable";
import MediaLibraryProgressStatus from "./MediaLibraryProgressStatus";
import MediaLibraryUploadControls from "./MediaLibraryUploadControls";
import { Alert, Paper } from "@mui/material";
import { useMediaLibraryUpload } from "./MediaFilesUploadContext";
import { distinctUntilKeyChanged } from "rxjs";

const MediaLibraryFiles: FC = () => {
  const { licenseType } = useMediaLibraryUpload(
    distinctUntilKeyChanged("licenseType"),
  )

  if (!licenseType) {
    return (
      <Alert severity={"warning"}>Для продолжения выберите тип лицензии</Alert>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <MediaUploadArea />

      <MediaFileTable />

      <MediaLibraryProgressStatus />

      <MediaLibraryUploadControls />
    </Paper>
  )
}

export default memo(MediaLibraryFiles);
