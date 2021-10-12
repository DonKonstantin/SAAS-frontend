import React from "react";
import convertSizeToUserFriendlyType from "../../../../services/helpers/GetUserFriendlyFileSize";
import {FileIcon, defaultStyles} from 'react-file-icon';
import LinearProgressWithLabel from "../../../ProgressBar";

// Свойства компонента
export interface FileUploadingProps {
    file: File
    uploadingStatus: number
}

// Компонент вывода загружаемого файла
const FileUploading = (props: FileUploadingProps) => {
    const {file, uploadingStatus} = props;
    const parts = file.name.split(".");
    const fileExtension = parts[parts.length - 1];

    return (
        <div className="entity-edit-file-uploading">
            <div className="icon">
                <FileIcon
                    id={file.name}
                    size={48}
                    extension={fileExtension}
                    {...(defaultStyles[fileExtension] || {})}
                />
            </div>
            <div className="name">{file.name}</div>
            <div className="size">Размер - {convertSizeToUserFriendlyType(file.size)}</div>
            <div className="progress">
                <LinearProgressWithLabel value={uploadingStatus} />
            </div>
        </div>
    )
};

// Экспортируем компонент
export default FileUploading;