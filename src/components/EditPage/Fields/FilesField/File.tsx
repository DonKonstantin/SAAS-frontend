import {FileData} from "../../../../services/filesService/interface";
import React from "react";
import FileUploading from "./FileUploading";
import {makeStyles, Paper} from "@material-ui/core";
import FileDisplay from "./FileDisplay";

// Стили компонента
const styles = makeStyles({
    paper: {
        padding: "8px 16px"
    },
});

// Свойства компонента
export interface FileProps {
    file: FileData | File
    uploadingStatus: number
    onDelete: { (): void }
    isDeletable: boolean
}

// Компонент вывода файла по переданным параметрам
const File = (props: FileProps) => {
    const {file, uploadingStatus, onDelete, isDeletable} = props;
    const isUploading = !(file as FileData).id;
    const classes = styles();

    if (isUploading) {
        return (
            <Paper className={classes.paper}>
                <FileUploading
                    file={file as File}
                    uploadingStatus={uploadingStatus}
                />
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <FileDisplay
                file={file as FileData}
                onDelete={onDelete}
                isDeletable={isDeletable}
            />
        </Paper>
    )
};

// Экспортируем компонент
export default File;