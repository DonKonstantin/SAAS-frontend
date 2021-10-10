import React, {useCallback} from "react";
import {FileData} from "../../../../services/filesService/interface";
import {Collection} from "../../../../services/types";
import File from "./File";

// Свойства компонента
export interface FilesListProps {
    files: (FileData | File)[]
    filesUploadingStatus: Collection<number>
    onChange: {(files: (FileData | File)[]): void}
}

// Компонент вывода листинга файлов
const FilesList = (props: FilesListProps) => {
    const {files, filesUploadingStatus, onChange} = props;
    const isDeletable = !files.find(f => !(f as FileData).id);

    // Обработка удаления файла
    const handleDeleteFile = useCallback((file: FileData) => {
        // Если есть еще не загруженные файлы, то отключаем удаление
        if (!isDeletable) {
            return
        }

        onChange(files.filter(f => (f as FileData).id !== file.id))
    }, [files]);

    return (
        <div className="files-list">
            {files.map((file, i) => (
                <File
                    key={`file-${(file as FileData).id || i}`}
                    file={file}
                    uploadingStatus={filesUploadingStatus[file.name] || 0}
                    onDelete={() => handleDeleteFile(file as FileData)}
                    isDeletable={isDeletable}
                />
            ))}
        </div>
    )
};

// Экспортируем компонент
export default FilesList;