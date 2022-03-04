import React, {FC, memo} from "react";
import {Button, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useMediaLibraryUpload} from "./MediaFilesUploadContext";

const MediaLibraryUploadControls: FC = () => {
    const {t} = useTranslation();
    const {
        deleteAllFiles,
        uploadAllFiles,
        replaceAllFiles,
        files,
    } = useMediaLibraryUpload();

    if (files.length === 0) {
        return null;
    }

    return (
        <>
            <Stack spacing={2} direction="row" flexWrap={"wrap"}>
                <Button
                    variant={"outlined"}
                    onClick={() => uploadAllFiles()}
                    disabled={files.length === 0}
                >
                    {t(`Загрузить все`)}
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={() => replaceAllFiles()}
                    disabled={files.length === 0}
                >
                    {t(`Заменить все`)}
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={() => deleteAllFiles()}
                    color={"error"}
                    disabled={files.length === 0}
                >
                    {t(`Удалить все`)}
                </Button>
            </Stack>
        </>
    )

}

export default memo(MediaLibraryUploadControls);
