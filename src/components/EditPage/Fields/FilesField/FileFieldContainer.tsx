import {FileData} from "../../../../services/filesService/interface";
import React, {useCallback, useEffect, useState} from "react";
import {Collection} from "../../../../services/types";
import {filesService} from "../../../../services/filesService";
import DropZone from "./DropZone";
import {Tooltip} from "@material-ui/core";
import FilesList from "./FilesList";

// Свойства компонента
export interface FileFieldContainerProps {
    title: string                               // Название поля
    files: FileData[]                           // Файлы, загруженные пользователем
    onChangeFiles: {(files: FileData[]): void}  // Изменение списка файлов
    tooltip?: string | React.ReactNode          // Подсказка при наведении на поле
    availableExtensions?: string[]              // Доступные расширения для загрузки файлов
}

// Компонент вывода поля для загрузки файлов
const FileFieldContainer = (props: FileFieldContainerProps) => {
    const {title, files, onChangeFiles, tooltip, availableExtensions} = props;
    const [filesToDisplay, setFilesToDisplay] = useState<(FileData | File)[]>(files);
    const [fileUploading, setFileUploading] = useState<Collection<number>>({});

    // Подписываемся на изменения файлов сверху
    useEffect(() => {
        setFilesToDisplay(files)
    }, [files]);

    // Подписываемся на изменения списка файлов для инициализации загрузки
    useEffect(() => {
        let isUnmounted = false;
        const filesToUpload = filesToDisplay.filter(file => !(file as FileData).id) as File[];
        setFileUploading({});

        const {subscription, upload} = filesService().UploadFiles(filesToUpload);
        const unsubscribe = subscription.subscribe({
            next: value => {
                setFileUploading(current => ({
                    ...current,
                    [value.file]: value.progress,
                }))
            },
        });

        upload()
            .then(uploaded => {
                if (isUnmounted) {
                    return
                }

                onChangeFiles([
                    ...files,
                    ...uploaded,
                ]);
            })
            .finally(() => unsubscribe.unsubscribe())
        ;

        // Маркируем флаг, что компонент размонтирован, а также отписываемся от изменений
        return () => {
            isUnmounted = true;

            try {
                unsubscribe.unsubscribe();
            } catch (e) {
                return
            }
        };
    }, [filesToDisplay]);

    // Обработчик загрузки файлов через DropZone
    const handleDropFiles = useCallback((dropped: File[]) => {
        setFilesToDisplay([
            ...files,
            ...dropped,
        ])
    }, [files]);

    const description = availableExtensions
        ? `Доступные типы файлов: ${availableExtensions.map(e => `.${e}`).join(", ")}`
        : `Переместите файлы для загрузки`
    ;

    return (
        <div className="files-uploading">
            <div className="title">{title}</div>
            <div className="description">
                Переместите загружаемые файлы в область справа.
                Вы можете удалить загруженные файлы используя соответствующий функционал в карточке файла.<br />
                <b>Изменения не будут сохранены до сохранения сущности.</b>
            </div>
            {filesToDisplay.length > 0 && (
                <FilesList
                    files={filesToDisplay}
                    filesUploadingStatus={fileUploading}
                    onChange={onChangeFiles}
                />
            )}
            <div className="dropzone">
                {tooltip && (
                    <Tooltip title={tooltip} arrow placement="top">
                        <div>
                            <DropZone
                                theme="secondary"
                                accept={(availableExtensions || []).map(e => `.${e}`).join(",")}
                                onDrop={handleDropFiles}
                                description={description}
                            />
                        </div>
                    </Tooltip>
                )}
                {!tooltip && (
                    <DropZone
                        theme="secondary"
                        accept={availableExtensions}
                        onDrop={handleDropFiles}
                        description={description}
                    />
                )}
            </div>
        </div>
    );
};

// Экспортируем компонент
export default React.memo(FileFieldContainer, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
});