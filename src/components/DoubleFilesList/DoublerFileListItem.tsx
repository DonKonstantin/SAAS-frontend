import {FC, memo} from "react";
import {Checkbox, IconButton, TableCell, TableRow, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import PlayAudioButton from "../AudioPlayeContainer/PlayAudioButton";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type Props = {
    isCurrent: boolean
    file: MediaFile
    onSelect: ((file: MediaFile) => void) | undefined
}

const DoublerFileListItem: FC<Props> = (props) => {
    const {onSelect, isCurrent, file} = props;
    const {t} = useTranslation();

    const selectHandler = () => {
        if (!onSelect) {
            return;
        }

        onSelect(file)
    }

    return (
        <TableRow>
            {onSelect && (
                <TableCell width={40} padding={"checkbox"}>
                    <Checkbox
                        onClick={selectHandler}
                        checked={isCurrent}
                    />
                </TableCell>
            )}
            <TableCell>
                {file.origin_name}
            </TableCell>
            <TableCell width={40} padding={"checkbox"}>
                <PlayAudioButton
                    fileName={file.file_name}
                />
            </TableCell>
        </TableRow>
    )
}

export default memo(DoublerFileListItem);
