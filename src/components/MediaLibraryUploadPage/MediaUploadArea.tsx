import React, {FC, useCallback} from "react";
import {Typography} from "@mui/material";
import DropZoneArea from "../DropZoneArea";
import * as mmb from "music-metadata-browser";
import {IAudioMetadata} from "music-metadata-browser";
import {MediaFileToUpload, useMediaLibraryUpload} from "./MediaFilesUploadContext";
import mediaFileFactory from "../../services/MediaLibraryService/mediaFileFactory";
import {LicenseType, MediaFile} from "../../services/MediaLibraryService/interface";

const metadataToMediaInfo = (
    metadata: IAudioMetadata,
): Partial<MediaFile> => {
    return {
        album: metadata.common.genre || "",
        artist: metadata.common.album || "",
        bpm: metadata.common.bpm || "",
        composer: metadata.common.composer || "",
        genre: metadata.common.genre || "",
        isrc: metadata.common.isrc || "",
        language: metadata.common.language || "",
        lyricist: metadata.common.lyricist || "",
        publisher: metadata.common.date || "",
        title: metadata.common.title || "",
        year: metadata.common.year || 0,
        duration: metadata.format.duration || 0,
    } as Partial<MediaFile>;
}

const makeMediaFileInfo = async (
    file: File,
    licenseType: LicenseType
): Promise<MediaFileToUpload> => {
    const metadata = await mmb.parseBlob(file, {skipPostHeaders: true})
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


const MediaUploadArea: FC = () => {
    const {
        addFilesToUpload,
        licenseType
    } = useMediaLibraryUpload();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Do something with the files
        if (acceptedFiles.length === 0) {
            return
        }

        const newFiles = await Promise.all(
            acceptedFiles
                .map(file => makeMediaFileInfo(file, licenseType as LicenseType))
        );

        addFilesToUpload(newFiles);
    }, [licenseType])

    return (
        <>
            <Typography color={"primary"}>
                Загрузка файлов
            </Typography>
            <Typography variant={"subtitle1"} sx={{opacity: 0.56, fontSize: 12}}>
                Переместите все файлы для загрузки в контейнер
            </Typography>
            <DropZoneArea
                onDrop={onDrop}
                accept={"audio/*"}
                active={false}
            />
        </>
    );
}

export default MediaUploadArea;
