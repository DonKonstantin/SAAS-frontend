import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import MediaFileEditForm from "./MediaFileEditForm";
import {useEditMediaFilesModal} from "./MediaFileEditDialogContext";
import {distinctUntilChanged} from "rxjs";

const MediaFileEditDialog: FC = props => {
    const {file, open, closeModal} = useEditMediaFilesModal(
        distinctUntilChanged()
    );

    if (!file) {
        return null;
    }

    return (
        <Dialog open={open} onClose={closeModal} maxWidth={"lg"} fullWidth>
            <DialogTitle>Редактирование</DialogTitle>
            <DialogContent>
                <MediaFileEditForm file={file}/>
            </DialogContent>
            <DialogActions>
                <Button>ПРИМЕНИТЬ ИЗМЕНЕНИЯ</Button>
                <Button onClick={() => closeModal()}>ОТМЕНА</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MediaFileEditDialog;
