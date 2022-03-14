import {FC} from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {distinctUntilChanged} from "rxjs";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import {useBulkEditFiles} from "../../context/BulkEditFilesContext";
import {TemplateMediaFile} from "../ListPageCustom/CustomStatusCell";
import PluralEditFileForm from "./PluralEditFileForm";

type Props = {
    onSave: { (file: MediaFile): void }
}

const BulkMediaFileEditDialog: FC<Props> = props => {
    const {onSave} = props;

    const {isOpen, toggleBulkEditFiles} = useBulkEditFiles(distinctUntilChanged())

    const handleSave = (newFile: MediaFile) => {
        onSave(newFile);
        toggleBulkEditFiles(false);
    }

    const closeModal = () => {
        toggleBulkEditFiles(false);
    }

    return (
        <Dialog open={isOpen} onClose={closeModal} maxWidth={"md"} fullWidth>
            <DialogTitle>Редактирование</DialogTitle>
            <DialogContent>
                <PluralEditFileForm
                    file={TemplateMediaFile}
                    onSave={handleSave}
                    onCancel={closeModal}
                />
            </DialogContent>
        </Dialog>
    )
}

export default BulkMediaFileEditDialog;
