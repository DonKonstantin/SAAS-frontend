import {FC, memo, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useReplaceFileDialog} from "./SelectReplaceFileDialogContext";
import {MediaFile} from "../../../services/MediaLibraryService/interface";
import DoubleFilesList from "../../DoubleFilesList";

type Props = {
    onSave(targetFile: MediaFile, replacedFile?: string, force?: boolean): void
    force?: boolean
}

const SelectReplaceFileDialog: FC<Props> = (props) => {
    const {open, closeReplaceFileDialog, targetFile, availableFiles} = useReplaceFileDialog();
    const [file, setFile] = useState<MediaFile | undefined>(availableFiles.length === 1 ? availableFiles[0] : undefined);
    const {onSave, force = false} = props;

    useEffect(() => {
        setFile(availableFiles.length === 1 ? availableFiles[0] : undefined);
    }, [targetFile])

    if (!targetFile) {
        return null;
    }

    const selectHandler = (file: MediaFile | undefined) => {
        setFile(file);

        onSave(targetFile as MediaFile, file?.id, !file?.id);
    }

    const saveHandler = () => {
        onSave(targetFile as MediaFile, file?.id, !file?.id);

        closeReplaceFileDialog();
    }

    return (
        <Dialog open={open} onClose={closeReplaceFileDialog} fullWidth maxWidth={"sm"}>
            <DialogTitle>
                Выбор заменяемого файла
                <Typography variant={"subtitle2"} sx={{opacity: 0.56, fontSize: 12}}>
                    В хранилище найдены возможные дубли. Выберите заменяемый файл или разрешите
                    загрузку нового.
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DoubleFilesList
                    onSelect={selectHandler}
                    current={file}
                    files={availableFiles}
                />
            </DialogContent>
            <DialogActions>
                {force && (
                    <Button
                        variant={"outlined"}
                        type={"submit"}
                        color={"primary"}
                        onClick={saveHandler}
                    >
                        {!file ? 'Загрузить новый' : 'Заменить'}
                    </Button>
                )}
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    onClick={() => closeReplaceFileDialog()}
                >
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(SelectReplaceFileDialog)
