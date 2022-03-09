import {FC, memo, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useReplaceFileDialog} from "./SelectReplaceFileDialogContext";
import ReplacedFilesList from "./ReplacedFilesList";
import {MediaFile} from "../../../services/MediaLibraryService/interface";

type Props = {
    onSave(targetFile: MediaFile, replacedFile?: MediaFile): void
}

const SelectReplaceFileDialog: FC<Props> = (props) => {
    const {open, closeReplaceFileDialog, targetFile} = useReplaceFileDialog();
    const [file, setFile] = useState<MediaFile | undefined>(undefined);
    const {onSave} = props;

    useEffect(() => {
        setFile(undefined);
    }, [targetFile])

    if (!targetFile) {
        return null;
    }

    const saveHandler = () => {
        if (!file) {
            return;
        }

        onSave(targetFile as MediaFile, file);
        closeReplaceFileDialog();
    }



    return (
        <Dialog open={open} onClose={closeReplaceFileDialog} fullWidth>
            <DialogTitle>Выбор заменяемого файла</DialogTitle>
            <DialogContent>
                <ReplacedFilesList
                    onSelect={setFile}
                    current={file}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    onClick={saveHandler}
                >
                    Подтвердить
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={() => closeReplaceFileDialog()}
                >
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(SelectReplaceFileDialog)
