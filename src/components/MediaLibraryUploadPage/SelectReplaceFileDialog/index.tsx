import {FC, memo, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useReplaceFileDialog} from "./SelectReplaceFileDialogContext";
import {MediaFile} from "../../../services/MediaLibraryService/interface";
import DoubleFilesList from "../../DoubleFilesList";

type Props = {
    onSave(targetFile: MediaFile, replacedFile?: string, force?: boolean): void
    force?: boolean
}

const SelectReplaceFileDialog: FC<Props> = (props) => {
    const {open, closeReplaceFileDialog, targetFile, availableFiles} = useReplaceFileDialog();
    const [file, setFile] = useState<MediaFile | undefined>(undefined);
    const {onSave, force = false} = props;

    useEffect(() => {
        setFile(undefined);
    }, [targetFile])

    if (!targetFile) {
        return null;
    }

    const saveHandler = (force = false) => {
        onSave(targetFile as MediaFile, file?.id || "", force);
        closeReplaceFileDialog();
    }

    return (
        <Dialog open={open} onClose={closeReplaceFileDialog} fullWidth>
            <DialogTitle>Выбор заменяемого файла</DialogTitle>
            <DialogContent>
                <DoubleFilesList
                    onSelect={setFile}
                    current={file}
                    files={availableFiles}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    onClick={() => saveHandler()}
                >
                    Подтвердить
                </Button>
                {force && (
                    <Button
                        variant={"outlined"}
                        type={"submit"}
                        onClick={() => saveHandler(true)}
                    >
                        Создать новый
                    </Button>
                )
                }
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
