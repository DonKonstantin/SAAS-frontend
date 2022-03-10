import {FC} from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {distinctUntilChanged} from "rxjs";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import {useBulkEditFiles} from "../../context/BulkEditFilesContext";
import {TemplateMediaFile} from "../ListPageCustom/CustomStatusCell";
import MediaFileEditForm from "../MediaFileEditDialog/MediaFileEditForm";

type Props = {
    onSave: {(file: MediaFile): void}
}

const BulkMediaFileEditDialog: FC<Props> = props => {
    const {onSave} = props;

    const {isOpen,toggleBulkEditFiles} = useBulkEditFiles(distinctUntilChanged())

    const handleSave = (newFile: MediaFile) => {
        onSave(newFile);
        toggleBulkEditFiles(false);
    }

    const closeModal = () => {
        toggleBulkEditFiles(false);
    }

    return (
        <Dialog open={isOpen} onClose={closeModal} maxWidth={"lg"} fullWidth>
            <DialogTitle>Редактирование</DialogTitle>
            <DialogContent>
                <MediaFileEditForm
                    file={TemplateMediaFile}
                    onSave={handleSave}
                    onCancel={closeModal}
                >
                </MediaFileEditForm>
            </DialogContent>
        </Dialog>
    )
}

export default BulkMediaFileEditDialog;
