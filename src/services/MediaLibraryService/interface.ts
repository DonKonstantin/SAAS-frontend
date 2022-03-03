// License type for use file
export enum LicenseType {
    rao_voice = "rao_voice",
    sparx = "sparx",
    amurco = "amurco"
}

// File of Media library
export type MediaFile = {
    album: string;
    artist: string;
    bpm: number
    composer: string;
    file_name: string;
    origin_name: string;
    genre: string;
    id: string
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

export type DoubleSearchResult = {
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
    delete(id: string[]): Promise<MediaFile[]>;

    /**
     * Update file
     * @param files
     */
    update(files: MediaFile[]): Promise<MediaFile[]>;

    /**
     * Find doubles
     * @param fileNames
     */
    findDoubles(fileNames: string[]): Promise<DoubleSearchResult[]>
}
