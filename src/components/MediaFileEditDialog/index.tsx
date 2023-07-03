import {FC} from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import MediaFileEditForm from "./MediaFileEditForm";
import {useEditMediaFilesModal} from "./MediaFileEditDialogContext";
import {distinctUntilChanged} from "rxjs";
import {MediaFile} from "../../services/MediaLibraryService/interface";

type Props = {
    onSave: {(file: MediaFile): void}
}

const MediaFileEditDialog: FC<Props> = props => {
    const {onSave} = props;
    const {file, open, closeModal, saveEditFile} = useEditMediaFilesModal(
        distinctUntilChanged()
    );

    if (!file) {
        return null;
    }

    const handleSave = (newFile: MediaFile) => {
        saveEditFile(newFile)
        onSave(newFile);
        closeModal();
    }

    return (
        <Dialog open={open} onClose={closeModal} maxWidth={"lg"} fullWidth>
            <DialogTitle>Редактирование</DialogTitle>
            <DialogContent>
                <MediaFileEditForm
                    file={file}
                    onSave={handleSave}
                    onCancel={closeModal}
                >
                </MediaFileEditForm>
            </DialogContent>
        </Dialog>
    )
}

export default MediaFileEditDialog;
