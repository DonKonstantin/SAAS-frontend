import {FC, memo} from "react";
import {Checkbox, TableCell, TableRow} from "@mui/material";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import PlayAudioButton from "../AudioPlayeContainer/PlayAudioButton";

type Props = {
    isCurrent: boolean
    file: MediaFile
    onSelect: ((file: MediaFile) => void) | undefined
}

const DoublerFileListItem: FC<Props> = (props) => {
    const {onSelect, isCurrent, file} = props;

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
                    songName={file.title}
                />
            </TableCell>
        </TableRow>
    )
}

export default memo(DoublerFileListItem);
