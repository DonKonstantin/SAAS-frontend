import {FC, memo} from "react";
import {Button, Checkbox, Stack, TableCell, TableRow} from "@mui/material";
import {MediaFile} from "../../../services/MediaLibraryService/interface";
import {useTranslation} from "react-i18next";
import PlayAudioButton from "../../AudioPlayeContainer/PlayAudioButton";
type Props = {
    onSelect(file: MediaFile): void
    isCurrent: boolean
    file: MediaFile
}


const ReplacedItem: FC<Props> = (props) => {
    const {onSelect, isCurrent, file} = props;
    const {t} = useTranslation();

    return (
        <TableRow>
            <TableCell>
                <Checkbox
                    onClick={() => onSelect(file)}
                    checked={isCurrent}
                />
            </TableCell>
            <TableCell>
                {file.origin_name}
            </TableCell>
            <TableCell>
                <Stack direction={"row"} spacing={2}>
                    <PlayAudioButton
                        fileName={file.file_name}
                    />
                    <Button variant={"outlined"}
                            onClick={() => onSelect(file)}>{t(`Выбрать`)}</Button>
                </Stack>
            </TableCell>
        </TableRow>
    )
}

export default memo(ReplacedItem);
