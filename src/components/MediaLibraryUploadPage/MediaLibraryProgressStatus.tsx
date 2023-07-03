import React, {FC, memo, useEffect, useMemo, useState} from "react";
import {LinearProgress, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {ProgressUploadStatusByFile, uploadStatus$, useMediaLibraryUpload} from "./MediaFilesUploadContext";

const MediaLibraryProgressStatus: FC = () => {
    const {t} = useTranslation();
    const [progress, setProgress] = useState<ProgressUploadStatusByFile>({});
    const {
        files
    } = useMediaLibraryUpload();

    useEffect(
        () => {
            const subscriber = uploadStatus$.subscribe({
                next: value => {
                    setProgress(value);
                }
            })

            return () => subscriber.unsubscribe();
        },
        []
    );


    const generalProgress = useMemo(
        () => {
            // считаем вес всех прикрепленных файлов
            const size = files.reduce((acc, file) => acc + file.file.size, 0);

            const uploadSize = Object.values(progress).reduce((acc, status) => acc + status.uploadSize, 0);

            if (uploadSize === 0) {
                return 0;
            }

            return Math.floor(uploadSize * 100 / size);
        },
        [files, progress]
    );

    if (files.length === 0) {
        return null;
    }

    return (
        <>
            <Typography variant={"subtitle1"} sx={{opacity: 0.56, fontSize: 12, pt: 3}}>
                {t(`Ход очереди`)}
            </Typography>
            <LinearProgress
                value={generalProgress}
                variant={"determinate"}
                sx={{mb: 2, mt: 2}}
            />
        </>
    )
}

export default memo(MediaLibraryProgressStatus);
