import DropZoneArea from "components/DropZoneArea";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import mediaFileClient from "services/MediaFileClient";
import { makeMediaFileInfo } from "./helpers";
import { Box, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { distinctUntilChanged } from "rxjs";
import { notificationsDispatcher } from "services/notifications";
import { ProgressUploadStatusByFile } from "components/MediaLibraryUploadPage/MediaFilesUploadContext";

/**
 * Компонент загрузки клипов
 * @returns
 */
const DropDownBlock: FC = () => {
  const { t } = useTranslation();

  const { addFilesToUpload, setIsLoading } = useCampaignPlaylistEditContext(
    distinctUntilChanged(() => true)
  );

  const [uploadingStatus, setUploadingStatus] =
    useState<ProgressUploadStatusByFile>({});

  const [uploading, setUploading] = useState<number>(100);

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

      setIsLoading(true);

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

        addFilesToUpload(filesId);
      } catch (error) {
        messanger.dispatch({
          message: `edit-campaign-playlist.error.upload${
            acceptedFiles.length > 1 ? "s" : ""
          }`,
          type: "error",
        });

        setIsLoading(false);
      }
    },
    [makeMediaFileInfo]
  );

  useEffect(() => {
    const inProgress = Object.values(uploadingStatus)
      .filter((status) => status.uploaded !== true)
      .map((status) => status.progress);

    const uploadingCount = inProgress.length;

    const summ = inProgress.reduce((acc, item) => acc + item, 0);

    setUploading(summ / uploadingCount);
  }, [uploadingStatus]);

  return (
    <Box sx={{ mb: "27px" }}>
      <DropZoneArea
        onDrop={onDrop}
        accept={"audio/*"}
        active={false}
        height={113}
        iconSize={18}
        dropZonePadding={22}
        messagePadding="15px 15px 10px"
        customInputText={t("edit-campaign-playlist.drop-zone.input-text")}
      />
      {uploading < 100 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={uploading} />
        </Box>
      )}
    </Box>
  );
};

export default memo(DropDownBlock);
