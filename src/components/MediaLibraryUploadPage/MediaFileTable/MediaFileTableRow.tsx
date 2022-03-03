import {FC, memo, useEffect, useState} from "react";
import {doubleFiles$, MediaFileToUpload, uploadStatus$} from "../MediaFilesUploadContext";
import {Button, LinearProgress, Stack, TableCell, TableRow} from "@mui/material";
import {humanFileSize} from "../../../services/MediaLibraryService/helpers";
import MediaFileMetaTagStatus from "../../ListPageCustom/MediaFileMetaTagStatus";
import {MediaFile} from "../../../services/MediaLibraryService/interface";

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
    const [doubles, setHasDoubles] = useState<MediaFile[]>([]);

    useEffect(() => {
        const s = uploadStatus$.subscribe({
            next: value => {
                const thisFileStatus = value[file.mediaInfo.uuid]

                if (!thisFileStatus) {
                    setProgress(0);

                    return;
                }

                setProgress(thisFileStatus.progress);
            }
        })

        s.add(doubleFiles$.subscribe(
            {next: value => {
                    const thisFileStatus = value[file.mediaInfo.uuid]

                    if (!thisFileStatus) {
                        setHasDoubles([]);

                        return;
                    }

                    setHasDoubles(thisFileStatus.doubles);
            }}
        ))
        return () => s.unsubscribe();
    }, [])

    return (
        <TableRow>
            <TableCell>
                {file.mediaInfo.origin_name}
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
            <TableCell width={130}>
                <MediaFileMetaTagStatus file={file.mediaInfo}/>
            </TableCell>
            <TableCell width={370}>
                <Stack spacing={1} flexWrap={"wrap"} direction={"row"} justifyContent={"end"}>
                    {
                        onEdit !== undefined && (
                            <Button onClick={() => onEdit ? onEdit(file) : false} variant={"outlined"} size={"small"}>
                                Редактировать
                            </Button>
                        )
                    }
                    {
                        onUpload !== undefined && (
                            <Button
                                onClick={() => onUpload ? onUpload(file) : false}
                                variant={"outlined"}
                                size={"small"}
                                disabled={progress === 100}
                            >
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
                    } {
                    doubles.length > 0 && (
                            <Button
                                onClick={() => onDelete ? onDelete(file) : false}
                                variant={"outlined"}
                                color={"error"}
                                size={"small"}
                            >
                                Есть дубли
                            </Button>
                        )
                    }
                </Stack>
            </TableCell>
        </TableRow>
    )
}

export default memo(MediaFileTableRow);
