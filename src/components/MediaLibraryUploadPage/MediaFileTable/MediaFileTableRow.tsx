import {FC, memo, useEffect, useState} from "react";
import {MediaFileToUpload, uploadStatus$} from "../MediaFilesUploadContext";
import {Button, LinearProgress, Stack, TableCell, TableRow} from "@mui/material";
import {humanFileSize} from "../../../services/MediaLibraryService/helpers";
import MediaFileMetaTagStatus from "../../ListPageCustom/MediaFileMetaTagStatus";

type Props = {
    file: MediaFileToUpload
    progress?: number // процент загрузки файла
    onDelete?: (file: MediaFileToUpload) => void // обработчик на удаление файла
    onUpload?: (file: MediaFileToUpload) => void // обработчик на загрузку файла
    onEdit?: (file: MediaFileToUpload) => void   // обработчик на редактирование файла
}

const MediaFileTableRow: FC<Props> = props => {
    const {
        file,
        onDelete,
        onEdit,
        onUpload
    } = props;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const s = uploadStatus$.subscribe({
            next: value => {
                console.log(value);
                const thisFileStatus = value[file.mediaInfo.uuid]

                if (!thisFileStatus) {
                    return;
                }

                setProgress(thisFileStatus.progress);
            }
        })

        return () => s.unsubscribe();
    }, [])

    return (
        <TableRow>
            <TableCell>
                {file.mediaInfo.file_name}
            </TableCell>
            <TableCell>
                {humanFileSize(file.mediaInfo.size)}
            </TableCell>
            <TableCell width={120}>
                <LinearProgress
                    value={progress}
                    variant={"determinate"}
                />
            </TableCell>
            <TableCell width={90}>
                <MediaFileMetaTagStatus file={file.mediaInfo}/>
            </TableCell>
            <TableCell>
                <Stack spacing={1} flexWrap={"wrap"}>
                    {
                        onEdit !== undefined && (
                            <Button onClick={() => onEdit ? onEdit(file) : false} variant={"outlined"} size={"small"}>
                                Редактировать
                            </Button>
                        )
                    }
                    {
                        onUpload !== undefined && (
                            <Button onClick={() => onUpload ? onUpload(file) : false} variant={"outlined"} size={"small"}>
                                Загрузить
                            </Button>
                        )
                    }
                    {
                        onDelete !== undefined && (
                            <Button
                                onClick={() => onDelete ? onDelete(file) : false}
                                variant={"outlined"}
                                color={"error"}
                                size={"small"}
                            >
                                Удалить
                            </Button>
                        )
                    }
                </Stack>
            </TableCell>
        </TableRow>
    )
}

export default memo(MediaFileTableRow);
