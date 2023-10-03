import React, { FC, memo } from "react";
import MediaUploadArea from "./MediaUploadArea";
import MediaFileTable from "./MediaFileTable";
import MediaLibraryProgressStatus from "./MediaLibraryProgressStatus";
import MediaLibraryUploadControls from "./MediaLibraryUploadControls";
import { Alert, Paper } from "@mui/material";
import { useMediaLibraryUpload } from "./MediaFilesUploadContext";
import { distinctUntilKeyChanged } from "rxjs";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const StyledStickyWrapper = styled('div')(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  backgroundColor: theme.palette.common.white,
  paddingBottom: 24,
}));

const MediaLibraryFiles: FC = () => {
  const { t } = useTranslation();

  const { licenseType } = useMediaLibraryUpload(
    distinctUntilKeyChanged("licenseType"),
  );

  if (!licenseType) {
    return (
      <Alert severity="warning">
        {t("medialibrary.upload.alert.select-license-type")}
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 3, pb: 0 }}>
      <MediaUploadArea />

      <MediaFileTable />

      <StyledStickyWrapper>
        <MediaLibraryProgressStatus />

        <MediaLibraryUploadControls />
      </StyledStickyWrapper>
    </Paper>
  );
};

export default memo(MediaLibraryFiles);
