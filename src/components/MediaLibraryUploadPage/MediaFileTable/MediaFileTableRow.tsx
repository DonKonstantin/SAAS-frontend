import {FC, useEffect, useMemo, useState} from "react";
import {doubleFiles$, MediaFileToUpload, uploadStatus$} from "../MediaFilesUploadContext";
import {IconButton, LinearProgress, Stack, TableCell, TableRow, Tooltip} from "@mui/material";
import {humanFileSize} from "../../../services/MediaLibraryService/helpers";
import MediaFileMetaTagStatus from "../../ListPageCustom/MediaFileMetaTagStatus";
import {MediaFile} from "../../../services/MediaLibraryService/interface";
import {useReplaceFileDialog} from "../SelectReplaceFileDialog/SelectReplaceFileDialogContext";
import WarningIcon from '@mui/icons-material/Warning';
import DoneIcon from '@mui/icons-material/Done';
import {useTranslation} from "react-i18next";
import MediaFileTagValidator from "../../../services/MediaLibraryService/validator/MediaFileTagValidator";
import EditIcon from '@mui/icons-material/Edit';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

type Props = {
    file: MediaFileToUpload
    progress?: number // процент загрузки файла
    onDelete?: (file: MediaFileToUpload) => void // обработчик на удаление файла
    onUpload?: (file: MediaFileToUpload) => void // обработчик на загрузку файла
    onEdit?: (file: MediaFileToUpload) => void   // обработчик на редактирование файла
}

const validator = new MediaFileTagValidator(["title", "origin_name", "artist", "license_type"])

const MediaFileTableRow: FC<Props> = props => {
    const {
        file,
        onDelete,
        onEdit,
        onUpload
    } = props;

    const [progress, setProgress] = useState(0);
    const [doubles, setHasDoubles] = useState<MediaFile[]>([]);
    const {openReplaceFileDialog} = useReplaceFileDialog();
    const {t} = useTranslation();

    const handleOpenReplaceDialog = () => {
        openReplaceFileDialog(file.mediaInfo, doubles)
    }

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
            {
                next: value => {
                    const thisFileStatus = value[file.mediaInfo.uuid]

                    if (!thisFileStatus) {
                        setHasDoubles([]);

                        return;
                    }

                    setHasDoubles(thisFileStatus.doubles);
                }
            }
        ))
        return () => s.unsubscribe();
    }, []);

    const requireFieldFill = validator.validate(file.mediaInfo).requiredPercent === 100

    const mayUploaded = useMemo(() => {
        if (progress > 0) {
            return false
        }

        if (progress === 100) {
            return false;
        }

        return requireFieldFill;

        /**
         * TODO: Сделать блокировку кнопки загрузки если есть дубли и не выбран файл для замены
         */
        // return !(file.hasDoubles && file.replaceId.length === 0);
    }, [progress, requireFieldFill]);

    const successUploaded = progress === 100;

    const isNewFile = file.forceUpload;
    const hasDoubles = doubles.length > 0;
    const isReplaced = !!file.replaceId;

    return (
        <TableRow>
            <TableCell>
                {file.mediaInfo.origin_name}
            </TableCell>
            <TableCell align={"center"} width={100}>
                {hasDoubles && progress !== 100 && (
                    <Tooltip title={t(`Имеются дубли файла. Нажмите чтобы принять решение`) as string}>
                        <IconButton onClick={() => handleOpenReplaceDialog()} size={"small"}>
                            <WarningIcon
                                color={
                                    !!file.replaceId || file.forceUpload
                                        ? 'primary'
                                        : 'warning'
                                }
                            />
                        </IconButton>
                    </Tooltip>
                )}
                {(progress === 100) && (
                    <Tooltip title={t(`Файл загружен`) as string}>
                        <span>
                            <IconButton disabled size={"small"}>
                                <DoneIcon color={"success"}/>
                            </IconButton>
                        </span>
                    </Tooltip>
                )}
                {isReplaced && (
                    <IconButton size={"small"}>
                        <PublishedWithChangesIcon color={"primary"}/>
                    </IconButton>
                )}
                {isNewFile && (
                    <IconButton size={"small"} disabled>
                        <FiberNewIcon color={"primary"}/>
                    </IconButton>
                )}

            </TableCell>
            <TableCell width={120}>
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
            <TableCell width={150}>
                <Stack spacing={1} flexWrap={"wrap"} direction={"row"} justifyContent={"end"}>
                    {
                        onEdit !== undefined && (
                            <Tooltip title={t(`Редактировать`) as string}>
                                <IconButton
                                    onClick={() => onEdit ? onEdit(file) : false}
                                    size={"small"}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                        )
                    }
                    {
                        onUpload !== undefined && (
                            <Tooltip title={t(!!file.replaceId ? "Заменить" : "Загрузить") as string}>
                                <span>
                                    <IconButton
                                        onClick={() => onUpload ? onUpload(file) : false}
                                        size={"small"}
                                        disabled={!mayUploaded}
                                    >
                                        {successUploaded ? <CloudDoneIcon color={"success"}/> : <CloudUploadIcon/>}
                                    </IconButton>
                                </span>
                            </Tooltip>
                        )
                    }
                    {
                        onDelete !== undefined && (
                            <Tooltip title={t("Удалить") as string}>
                                <IconButton
                                    onClick={() => onDelete ? onDelete(file) : false}
                                    color={"error"}
                                    size={"small"}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </Stack>
            </TableCell>
        </TableRow>
    )
}

export default MediaFileTableRow;