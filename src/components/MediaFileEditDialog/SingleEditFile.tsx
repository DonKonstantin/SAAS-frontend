import {FC} from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useEditMediaFilesModal} from "./MediaFileEditDialogContext";
import {distinctUntilChanged} from "rxjs";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import SingleEditFileForm from "./SingleEditFileForm";

type Props = {
    onSave: {(file: MediaFile): void}
}

const SingleEditFile: FC<Props> = props => {
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
                <SingleEditFileForm
                    file={file}
                    onSave={handleSave}
                    onCancel={closeModal}
                >
                </SingleEditFileForm>
            </DialogContent>
        </Dialog>
    )
}

export default SingleEditFile;
