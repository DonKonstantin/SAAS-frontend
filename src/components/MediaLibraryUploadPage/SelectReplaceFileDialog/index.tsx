import {FC, memo, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useReplaceFileDialog} from "./SelectReplaceFileDialogContext";
import PerlacedFilesList from "./PerlacedFilesList";
import {MediaFile} from "../../../services/MediaLibraryService/interface";

type Props = {
    onSave(targetFile: MediaFile, replacedFile?: MediaFile): void
}

const SelectReplaceFileDialog: FC<Props> = (props) => {
    const {open, closeReplaceFileDialog, targetFile} = useReplaceFileDialog();
    const [file,setFile] = useState<MediaFile | undefined>(undefined);
    const {onSave} = props;

    if (!targetFile) {
        return null;
    }

    return (
        <Dialog open={open} onClose={closeReplaceFileDialog} fullWidth>
            <DialogTitle>Выбор заменяемого файла</DialogTitle>
            <DialogContent>
                <PerlacedFilesList
                    onSelect={setFile}
                    current={file}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    onClick={() => onSave(targetFile, file)}
                >Подтвердить</Button>
                <Button
                    variant={"outlined"}
                    onClick={() => closeReplaceFileDialog()}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(SelectReplaceFileDialog)
