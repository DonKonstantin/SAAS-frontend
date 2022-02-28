import {FC, useCallback} from "react";
import {TableBody} from "@mui/material";
import {MediaFileToUpload, useMediaLibraryUpload} from "../MediaFilesUploadContext";
import MediaFileTableRow from "./MediaFileTableRow";
import {useEditMediaFilesModal} from "../../MediaFileEditDialog/MediaFileEditDialogContext";
import {MediaFile} from "../../../services/MediaLibraryService/interface";

const MediaFileTableBody: FC = props => {
    const {
        files,
        removeFilesToUpload,
        uploadFiles
    } = useMediaLibraryUpload();
    const {
        setEditFile
    } = useEditMediaFilesModal()

    const handleDeleteFile = useCallback(
        (file: MediaFileToUpload) => removeFilesToUpload([file]),
        []
    );

    const handleEditFile = useCallback(
        (file: MediaFileToUpload) => setEditFile(file.mediaInfo),
        []
    );
    const handleUploadFile = useCallback(
        (file: MediaFileToUpload) => uploadFiles([file]),
        []
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
