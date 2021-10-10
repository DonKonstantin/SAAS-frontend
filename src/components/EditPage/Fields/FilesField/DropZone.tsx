import React from 'react';
import {DropzoneOptions, useDropzone} from 'react-dropzone';
import {Typography} from "@material-ui/core";
import clsx from "clsx";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// Свойства компонента drop зоны для загрузки файлов
export interface DropZoneProps extends DropzoneOptions {
    title?: string
    description?: string
    className?: string
    theme?: "primary" | "secondary" | "orange"
}

// Компонент вывода drop зоны загрзуки файлов
function DropZone(props: DropZoneProps) {
    const {
        title = "Переместите загружаемые файлы",
        description,
        theme = "primary",
        className,
        ...dropZoneOptions
    } = props;

    const {
        getRootProps,
        getInputProps
    } = useDropzone(dropZoneOptions);

    return (
        <div className={clsx(`edit-page-dropzone`, `${theme}-color`, className)}>
            <div {...getRootProps({className: `container`})}>
                <input {...getInputProps()} />
                <div className={`component--description`}>
                    <CloudUploadIcon fontSize="large"/>
                    <Typography variant="h6">{title}</Typography>
                    {description && <Typography variant="caption">{description}</Typography>}
                </div>
            </div>
        </div>
    );
}

// Экспортируем компонент
export default DropZone;