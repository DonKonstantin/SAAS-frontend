import React, {FC, memo} from "react";
import {Button, Stack, Tooltip} from "@mui/material";
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

    const hasReplacedFiles = files.filter(file => !!file.autoReplaceId).length > 0;

    if (files.length === 0) {
        return null;
    }

    return (
        <>
            <Stack spacing={2} direction="row" flexWrap={"wrap"}>
                <Button
                    variant={"outlined"}
                    onClick={() => uploadAllFiles()}
                >
                    {t(`Загрузить все`)}
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={() => replaceAllFiles()}
                    disabled={!hasReplacedFiles }
                >
                    {t(`Заменить все`)}
                </Button>
                <Tooltip title={"Очистить очередь, уже загруженные файлы не удаляться из хранилища"}>
                    <Button
                        variant={"outlined"}
                        onClick={() => deleteAllFiles()}
                        color={"error"}
                    >
                        {t(`Очистить список`)}
                    </Button>
                </Tooltip>
            </Stack>
        </>
    )

}

export default memo(MediaLibraryUploadControls);
