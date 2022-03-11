import {FC, memo, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useConfirmDoubleDialog} from "./ConfirmDoubleDialodContext";
import {MediaFile} from "../../../services/MediaLibraryService/interface";
import DoubleFilesList from "../../DoubleFilesList";

type Props = {
    onConfirm(targetFile: string): void
}

const SelectReplaceFileDialog: FC<Props> = (props) => {
    const {open, closeReplaceFileDialog, targetFileName, availableFiles} = useConfirmDoubleDialog();
    const {onConfirm} = props;

    if (!targetFileName) {
        return null;
    }

    const confirmHandler = () => {
        onConfirm(targetFileName);
        closeReplaceFileDialog();
    }

    return (
        <Dialog open={open} onClose={closeReplaceFileDialog} fullWidth>
            <DialogTitle>Файл действительно является дублем?</DialogTitle>
            <DialogContent>
                <DoubleFilesList
                    files={availableFiles}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"outlined"}
                    onClick={() => confirmHandler()}
                >
                    Нет
                </Button>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    onClick={() => closeReplaceFileDialog()}
                >
                    Да
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(SelectReplaceFileDialog)
