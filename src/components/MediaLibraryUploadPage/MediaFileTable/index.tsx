import {FC} from "react";
import {Table, TableContainer} from "@mui/material";
import MediaFileTableHeader from "./MediaFileTableHeader";
import MediaFileTableBody from "./MediaFileTableBody";
import {useMediaLibraryUpload} from "../MediaFilesUploadContext";
import {distinctUntilChanged} from "rxjs";

/**
 * Component for show file to upload on server
 */
const MediaFileTable: FC = () => {
    const {files} = useMediaLibraryUpload(distinctUntilChanged(
        (previous, current) => previous.files.length === current.files.length
    ));

    if (files.length === 0) {
        return null;
    }

    return (
        <TableContainer sx={{ mt: 2 }}>
            <Table>
                <MediaFileTableHeader/>
                <MediaFileTableBody/>
            </Table>
        </TableContainer>
    )
}

export default MediaFileTable
