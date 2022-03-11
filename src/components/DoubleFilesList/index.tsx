import {MediaFile} from "../../services/MediaLibraryService/interface";
import {FC, memo, useCallback} from "react";
import {Table, TableBody, TableContainer, Typography} from "@mui/material";
import DoublerFileListItem from "./DoublerFileListItem";

type Props = {
    onSelect?(file: MediaFile): void
    current: MediaFile | undefined
    files: MediaFile[]
}

const DoubleFilesList: FC<Props> = props => {
    const {
        onSelect,
        current,
        files
    } = props;

    const onSelectHandler = typeof onSelect === "function"
        ? useCallback((file: MediaFile) => {
            if (!onSelect) {
                return;
            }

            onSelect(file);
        }, [onSelect])
        : undefined;

    return (
        <>
            <Typography variant={"subtitle2"} sx={{mb:2}}>
                Возможные дубли:
            </Typography>
            <TableContainer>
                <Table
                    sx={{minWidth: 400}}
                    aria-labelledby="tableTitle"
                    size={"small"}
                >
                    <TableBody>
                        {files.map(file => (
                            <DoublerFileListItem
                                key={file.id}
                                file={file}
                                onSelect={onSelectHandler}
                                isCurrent={current?.id === file.id}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default memo(DoubleFilesList);
