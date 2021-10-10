import {Subscribable} from "rxjs";

/**
 * Сущность файла
 */
export interface FileData {
    created_at: string
    id: string
    mime_type: string
    name: string
    name_original: string
    size: number
}

// Тип, описывающий данные подписки на процесс загрузки файлов
export interface FileUploadingSubscriptionData {
    file: string
    progress: number
}

// Предварительный результат для загрузки файлов
export type UploadResult = {
    subscription: Subscribable<FileUploadingSubscriptionData>,
    upload: {(): Promise<FileData[]>}
}

/**
 * Сервис для работы с файлами
 */
export interface FilesServiceInterface {
    /**
     * Загрузка списка файлов по переданным ID
     * @param id
     */
    LoadFilesById(id: string[]): Promise<FileData[]>

    /**
     * Загрузка файлов на сервер
     * @param files
     */
    UploadFiles(files: File[]): UploadResult

    /**
     * Клонирование переданного списка файлов
     * @param id
     */
    CloneFiles(id: string[]): Promise<FileData[]>

    /**
     * Получение ссылки для отображения файла
     * @param file
     */
    GetFileUrl(file: FileData): string
}