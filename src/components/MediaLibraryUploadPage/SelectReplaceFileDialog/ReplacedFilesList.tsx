import {FC, useCallback} from "react";
import {MediaFile} from "../../../services/MediaLibraryService/interface";
import {Table, TableBody, TableContainer} from "@mui/material";
import {useReplaceFileDialog} from "./SelectReplaceFileDialogContext";
import ReplacedItem from "./ReplacedItem";

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

   const onSelectHandler = useCallback((file) => {
       onSelect(file);
   }, [onSelect]);

    return (
        <TableContainer>
            <Table
                sx={{minWidth: 400}}
                aria-labelledby="tableTitle"
                size={"small"}
            >
                <TableBody>
                    {availableFiles.map(file => (
                        <ReplacedItem
                            key={file.id}
                            file={file}
                            onSelect={onSelectHandler}
                            isCurrent={current?.id === file.id}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ReplacedFilesList;
