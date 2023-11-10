// License type for use file
import {FileUpdateSetType} from "./query/UpdateFilesByIdMutation";

export enum LicenseType {
    rao_voice = "rao_voice",
    sparx = "sparx",
    amurco = "amurco",
}

// File of Media library
export type MediaFile = {
    album: string;
    artist: string;
    bpm: number
    composer: string;
    creator: string;
    creation_date: string,
    file_name: string;
    origin_name: string;
    last_change_date: string;
    hash_sum: string,
    genre: string;
    id: string
    last_editor: string;
    isrc: string;
    language: string;
    license_type: LicenseType
    lyricist: string;
    mime_type: string;
    obscene: boolean
    publisher: string;
    title: string;
    year: number
    duration: number
    size: number
    uuid: string
}

export type MediaFileTags = keyof MediaFile;

// File of Media library
export type ProjectMediaFile = {
    composer: string
    duration: number
    file_name: string
    hash_sum: string
    id?: number
    last_change_date: Date
    mime_type: string
    origin_name: string
    project_id?: number
    title: string
    player_file_id: number
    isFreeProjectFile?: boolean;                                //  This flag need to set is it free proect file
}

/**
 * Результат процента заполненности тегов файла
 */
export type MediaFileValidateResult = {
    generalPercent: number // Общий прогресс заполнения всех полей что есть в файле
    requiredPercent: number // Процент заполнения обязательных полей
}

export interface MediaFileTagValidatorInterface {
    validate(file: MediaFile): MediaFileValidateResult
}

export type MediaFilesDoubles = {
    fileName: string,
    doubles: MediaFile[]
}

/**
 * Сервис по работе с сущностью медиа-файла
 */
export interface MediaLibraryServiceInterface {
    /**
     * Load file
     * @param id
     */
    load(id: string[]): Promise<MediaFile[]>;

    /**
     * Delete file
     * @param id
     */
    delete(id: string[]): Promise<number>;

    /**
     * Update file
     * @param ids
     * @param fields
     */
    update(ids: string[],fields:FileUpdateSetType): Promise<number>;

    /**
     * Find doubles
     * @param fileNames
     */
    findDoubles(fileNames: string[]): Promise<MediaFilesDoubles[]>
}
