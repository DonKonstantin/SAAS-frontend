import {FC, useCallback} from "react";
import {TableBody} from "@mui/material";
import {MediaFileToUpload, useMediaLibraryUpload} from "../MediaFilesUploadContext";
import MediaFileTableRow from "./MediaFileTableRow";
import {useEditMediaFilesModal} from "../../MediaFileEditDialog/MediaFileEditDialogContext";

const MediaFileTableBody: FC = () => {
    const {
        files,
        uploadFiles,
        deleteFilesById
    } = useMediaLibraryUpload();
    const {
        setEditFile
    } = useEditMediaFilesModal()

    const handleDeleteFile = useCallback(
        (file: MediaFileToUpload) => deleteFilesById([file.mediaInfo.id || file.mediaInfo.uuid]),
        [deleteFilesById]
    );

    const handleEditFile = useCallback(
        (file: MediaFileToUpload) => setEditFile(file.mediaInfo),
        [setEditFile]
    );
    const handleUploadFile = useCallback(
        (file: MediaFileToUpload) => uploadFiles([file]),
        [uploadFiles]
    );

    return (
        <TableBody>
            {
                files.map(file => (
                    <MediaFileTableRow
                        key={file.mediaInfo.uuid}
                        file={file}
                        onDelete={handleDeleteFile}
                        onEdit={handleEditFile}
                        onUpload={handleUploadFile}
                    />
                ))
            }
        </TableBody>
    )
}

export default MediaFileTableBody;
