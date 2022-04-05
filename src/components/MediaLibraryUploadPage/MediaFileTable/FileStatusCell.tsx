import {FC} from "react";
import {IconButton, Tooltip} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import WarningIcon from "@mui/icons-material/Warning";
import DoneIcon from "@mui/icons-material/Done";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import {useTranslation} from "react-i18next";
import {MediaFileToUpload} from "../MediaFilesUploadContext";
import {MediaFile} from "../../../services/MediaLibraryService/interface";
import {useReplaceFileDialog} from "../SelectReplaceFileDialog/SelectReplaceFileDialogContext";

type Props = {
    progress: number;
    file: MediaFileToUpload;
    doubles: MediaFile[];
}

const FileStatusCell: FC<Props> = props => {
    const {progress, file, doubles} = props;
    const {t} = useTranslation();

    const isNewFile = file.forceUpload;
    const hasDoubles = doubles.length > 0;
    const mayAutoReplaced = !!file.autoReplaceId;
    const isReplaced = !!file.replaceId;

    const {openReplaceFileDialog} = useReplaceFileDialog();

    const handleOpenReplaceDialog = () => {
        openReplaceFileDialog(file.mediaInfo, doubles)
    }

    if (mayAutoReplaced && !isNewFile) {
        return (
            <>
                {(progress === 100) && (
                    <Tooltip title={t(`Файл загружен`) as string}>
                        <span>
                            <IconButton disabled size={"small"}>
                                <DoneIcon color={"success"}/>
                            </IconButton>
                        </span>
                    </Tooltip>
                )}
                <Tooltip title={t(`Файл будет перезаписан`) as string}>
                    <IconButton size={"small"} onClick={() => handleOpenReplaceDialog()}>
                        <ReplayIcon
                            color={
                                progress === 100
                                    ? 'primary'
                                    : 'warning'
                            }
                        />
                    </IconButton>
                </Tooltip>
            </>
        )
    }

    if (hasDoubles && progress !== 100) {
        return (
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
        )
    }

    return (
        <>
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
        </>
    )
}

export default FileStatusCell;
