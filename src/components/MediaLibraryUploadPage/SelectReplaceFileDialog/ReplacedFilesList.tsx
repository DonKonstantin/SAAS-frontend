import {FC} from "react";
import {MediaFile} from "../../../services/MediaLibraryService/interface";
import {Button, Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {useReplaceFileDialog} from "./SelectReplaceFileDialogContext";
import {useTranslation} from "react-i18next";

type Props = {
    onSelect(file: MediaFile): void
    current: MediaFile | undefined
}

const ReplacedFilesList: FC<Props> = props => {
    const {
        onSelect,
        current
    } = props;
    const {availableFiles = []} = useReplaceFileDialog();
    const {t} = useTranslation();

    const playHandler = () => {
    };

    return (
        <TableContainer>
            <Table
                sx={{minWidth: 400}}
                aria-labelledby="tableTitle"
                size={"small"}
            >
                <TableBody>
                    {availableFiles.map(file => (
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    onClick={() => onSelect(file)}
                                    checked={current?.id === file.id}
                                />
                            </TableCell>
                            <TableCell>
                                {file.origin_name}
                            </TableCell>
                            <TableCell>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant={"outlined"} onClick={playHandler}>{t(`Проиграть`)}</Button>
                                    <Button variant={"outlined"}
                                            onClick={() => onSelect(file)}>{t(`Выбрать`)}</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ReplacedFilesList;
