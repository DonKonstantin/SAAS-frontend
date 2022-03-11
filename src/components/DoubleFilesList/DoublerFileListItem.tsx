import {FC, memo} from "react";
import {Button, Checkbox, TableCell, TableRow} from "@mui/material";
import {useTranslation} from "react-i18next";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import PlayAudioButton from "../AudioPlayeContainer/PlayAudioButton";

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
                <TableCell width={40}>
                    <Checkbox
                        onClick={selectHandler}
                        checked={isCurrent}
                    />
                </TableCell>
            )}
            <TableCell width={40} sx={{pr: 0, pl: 0}}>
                <PlayAudioButton
                    fileName={file.file_name}
                />
            </TableCell>
            <TableCell >
                {file.origin_name}
            </TableCell>
            {onSelect && (
                <TableCell>
                    <Button
                        variant={"outlined"}
                        onClick={selectHandler}
                    >
                        {t(`Выбрать`)}
                    </Button>
                </TableCell>
            )}

        </TableRow>
    )
}

export default memo(DoublerFileListItem);
