import React, { memo, useCallback, useEffect, useState } from 'react';
import { Grid, LinearProgress, Paper } from "@mui/material";
import { Box } from "@mui/system";
import DropZoneArea from "../../../DropZoneArea";
import { makeMediaFileInfo } from '../EditPlaylist/Clips/helpers';
import { useTranslation } from "react-i18next";
import mediaFileClient from "../../../../services/MediaFileClient";
import { ProgressUploadStatusByFile } from 'components/MediaLibraryUploadPage/MediaFilesUploadContext';
import { notificationsDispatcher } from "../../../../services/notifications";
import { useCampaignEditContext } from "../../../../context/CampaignEditContext/useCampaignEditContext";
import { distinctUntilChanged } from "rxjs";
import { ErrorCode, FileRejection } from "react-dropzone";

const CampaignMediaFilesUpload = () => {

  const { t } = useTranslation();

  const { addFilesToUploadPlaylist } = useCampaignEditContext(
    distinctUntilChanged(() => true)
  );

  const [uploadingStatus, setUploadingStatus] =
    useState<ProgressUploadStatusByFile>({});

  const [uploading, setUploading] = useState<number>(100);
  const [errorInDrag, setErrorInDrag] = useState<FileRejection[]>([]);

  const getErrors = useCallback((data: FileRejection[]) => {
    setErrorInDrag(data)
  }, [])

  const messanger = notificationsDispatcher();

  const updateFileUploadProgressStatus = (fileName: string, progressEvent) => {
    const percent = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );

    setUploadingStatus({
      ...uploadingStatus,
      [fileName]: {
        progress: percent,
        uploadSize: progressEvent.loaded,
        uploaded: percent >= 100,
      },
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const newFiles = await Promise.all(
        acceptedFiles.map((file) => makeMediaFileInfo(file))
      );

      try {
        const response = await Promise.all(
          newFiles.map((file) =>
            mediaFileClient().UploadWithoutLicense(file.file, file.mediaInfo, {
              onUploadProgress: updateFileUploadProgressStatus.bind(null, [
                file.file.name,
              ]),
            })
          )
        );

        const filesId = response
          .map((res) => JSON.parse(res.data))
          .map((file) => file.file.id);

        addFilesToUploadPlaylist(filesId);
      } catch (error) {
        messanger.dispatch({
          message: `edit-campaign-playlist.error.upload${
            acceptedFiles.length > 1 ? "s" : ""
          }`,
          type: "error",
        });

      }
    },
    [makeMediaFileInfo]
  );

  useEffect(() => {
    const inProgress = Object.values(uploadingStatus)
      .filter((status) => !status.uploaded)
      .map((status) => status.progress);

    const uploadingCount = inProgress.length;

    const summ = inProgress.reduce((acc, item) => acc + item, 0);

    setUploading(summ / uploadingCount);
  }, [uploadingStatus]);

  const errorMsg = () => {
    switch (errorInDrag[0].errors[0].code) {
      case ErrorCode.TooManyFiles:
        return t(`pages.campaign.edit.fields.content.playlist.drop-zone.error.${errorInDrag[0].errors[0].code}`, { count: 5 })

      case ErrorCode.FileInvalidType:
        return t(`pages.campaign.edit.fields.content.playlist.drop-zone.error.${errorInDrag[0].errors[0].code}`, { type: "audio/*" })
  
      default:
        return errorInDrag[0].errors[0].message
    }
  }
  
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper sx={{ p: "14.5px 0 28px 0" }}>
          {
            errorInDrag.length > 0
              ? <Box
                sx={{ color: "red", fontSize: "20px", mb: "5px" }}
              >
                {errorMsg()}
              </Box>
              : null
          }
          <DropZoneArea
            onDrop={onDrop}
            accept={"audio/*"}
            active={false}
            customInputText={t("pages.campaign.edit.fields.content.playlist.drop-zone.title")}
            height={113}
            iconSize={50}
            dropZonePadding={22}
            messagePadding="15px 15px 10px"
            maxFiles={5}
            reverseCallbackErrors={getErrors}
          />

          {uploading < 100 && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress variant="determinate" value={uploading}/>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default memo(CampaignMediaFilesUpload)
