import {FC, memo} from "react";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from "@mui/icons-material/Warning";
import {useConfirmDoubleDialog} from "./ConfirmDoubleDialog/ConfirmDoubleDialodContext";
import {useTranslation} from "react-i18next";

type Props = {
    fileName: string;
    doubles?: MediaFile[];
}

// Компонент вывода результатов проверки файлов на дубли
const CheckMediaFilesItem: FC<Props> = (props) => {
    const {fileName, doubles} = props;
    const {openReplaceFileDialog} = useConfirmDoubleDialog();
    const {t} = useTranslation();

    const hasDoubles = !!doubles && doubles?.length > 0;

    const handleOpenReplaceDialog = () => {
        if (!doubles) {
            return;
        }

        openReplaceFileDialog(fileName, doubles)
    }

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
            <Typography sx={{mr: 1}}>
                {fileName}
            </Typography>

            {!hasDoubles && (
                <IconButton disabled>
                    <CheckIcon fontSize={"small"} color={"success"}/>
                </IconButton>
            )}

            {hasDoubles && (
                <Tooltip title={t(`Имеются дубли файла. Нажмите чтобы принять решение`) as string}>
                    <IconButton onClick={() => handleOpenReplaceDialog()}>
                        <WarningIcon
                            fontSize={"small"}
                            color={"warning"}
                        />
                    </IconButton>
                </Tooltip>
            )}
        </Box>

    )
}

export default memo(CheckMediaFilesItem);
