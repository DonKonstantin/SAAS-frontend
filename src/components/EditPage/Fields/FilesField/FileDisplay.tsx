import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import convertSizeToUserFriendlyType from "../../../../services/helpers/GetUserFriendlyFileSize";
import {FileIcon, defaultStyles} from 'react-file-icon';
import {IconButton, Link, Tooltip} from "@material-ui/core";
import {FileData} from "../../../../services/filesService/interface";
import {filesService} from "../../../../services/filesService";
import dynamic from "next/dist/next-server/lib/dynamic";

const FileIconComponent = dynamic(
    async () => FileIcon,
    {ssr: false}
);

// Свойства компонента
export interface FileDisplayProps {
    file: FileData
    onDelete: { (): void }
    isDeletable: boolean
}

// Компонент вывода загружаемого файла
const FileDisplay = (props: FileDisplayProps) => {
    const {file, onDelete, isDeletable} = props;
    const parts = file.name.split(".");
    const fileExtension = parts[parts.length - 1];

    return (
        <div className="entity-edit-file-display">
            <div className="icon">
                <FileIconComponent
                    id={file.name}
                    size={48}
                    extension={fileExtension}
                    {...(defaultStyles[fileExtension] || {})}
                />
            </div>
            <div className="name">
                <Link href={filesService().GetFileUrl(file)} target="_blank">
                    {file.name_original}
                </Link>
            </div>
            <div className="size">Размер - {convertSizeToUserFriendlyType(file.size)}</div>
            <div className="actions">
                <Tooltip title={"Удалить выбранный файл"}>
                    <span>
                        <IconButton
                            onClick={onDelete}
                            size="small"
                            disabled={!isDeletable}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        </div>
    )
};

// Экспортируем компонент
export default FileDisplay;