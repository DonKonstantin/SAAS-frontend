import React, { FC, useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";
import DropZoneArea from "../DropZoneArea";
import * as mmb from "music-metadata-browser";
import { IAudioMetadata } from "music-metadata-browser";
import { MediaFileToUpload, useMediaLibraryUpload } from "./MediaFilesUploadContext";
import mediaFileFactory from "../../services/MediaLibraryService/mediaFileFactory";
import { LicenseType, MediaFile } from "../../services/MediaLibraryService/interface";
import LoadingBlocker from "components/LoadingBlocker";
import { styled } from "@mui/system";

const metadataToMediaInfo = (
  metadata: IAudioMetadata,
): Partial<MediaFile> => {
  return {
    album: metadata.common.album || "",
    artist: metadata.common.artist || "",
    bpm: metadata.common.bpm || "",
    composer: metadata.common.composer || "",
    genre: metadata.common.genre || "",
    isrc: metadata.common.isrc || "",
    language: metadata.common.language || "",
    lyricist: metadata.common.lyricist || "",
    // TODO: must get from not from default prop
    publisher: metadata.common?.label?.join(", ") || "",
    title: metadata.common.title || "",
    year: metadata.common.year || 0,
    duration: metadata.format.duration || 0,
  } as Partial<MediaFile>;
}

const makeMediaFileInfo = async (
  file: File,
  licenseType: LicenseType
): Promise<MediaFileToUpload> => {
  const metadata = await mmb.parseBlob(file, { skipPostHeaders: true })
  return {
    replace: false,
    replaceId: "",
    hasDoubles: false,
    file,
    mediaInfo: mediaFileFactory(
      {
        ...metadataToMediaInfo(metadata),
        size: file.size,
        origin_name: file.name
      },
      licenseType
    )
  };
}

const StyledLoaderClickblocker = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.grey[0],
  opacity: 0.5,
}));

const StyledLoaderWrapper = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  opacity: '1 !important',
});

const MediaUploadArea: FC = () => {
  const {
    addFilesToUpload,
    licenseType
  } = useMediaLibraryUpload();

  //  Флаг подготовки файлов к отображению в списке загружаемых
  const [isPreparing, setIsPreparing] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return
    }

    setIsPreparing(true);

    const newFiles = await Promise.all(
      acceptedFiles
        .map(file => makeMediaFileInfo(file, licenseType as LicenseType))
    );

    addFilesToUpload(newFiles);

    setIsPreparing(false);
  }, [licenseType, setIsPreparing, addFilesToUpload, makeMediaFileInfo]);

  return (
    <>
      <Typography color={"primary"} >
        Загрузка файлов
      </Typography>

      <Typography variant={"subtitle1"} sx={{ opacity: 0.56, fontSize: 12, mb: 2 }}>
        Переместите все файлы для загрузки в контейнер
      </Typography>

      <Box sx={{ position: 'relative' }}>
        {isPreparing && (
          <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
            <StyledLoaderClickblocker/>
            
            <StyledLoaderWrapper>
              <LoadingBlocker />
            </StyledLoaderWrapper>
          </Box>
        )}

        <DropZoneArea
          onDrop={onDrop}
          accept={"audio/*"}
          active={false}
        />
      </Box>
    </>
  );
}

export default MediaUploadArea;
