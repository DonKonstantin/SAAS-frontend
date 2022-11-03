import React, { memo } from 'react';
import { Grid, Paper } from "@mui/material";
import MediaUploadArea from "../../../MediaLibraryUploadPage/MediaUploadArea";
import { Box } from "@mui/system";
import MediaFileTable from "../../../MediaLibraryUploadPage/MediaFileTable";
import MediaLibraryProgressStatus from "../../../MediaLibraryUploadPage/MediaLibraryProgressStatus";
import MediaLibraryUploadControls from "../../../MediaLibraryUploadPage/MediaLibraryUploadControls";

const CampaignMediaFilesUpload = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <MediaUploadArea/>
          <Box
            sx={{ mb: 2 }}
          />
          <MediaFileTable/>
          <MediaLibraryProgressStatus/>
          <MediaLibraryUploadControls/>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default memo(CampaignMediaFilesUpload)