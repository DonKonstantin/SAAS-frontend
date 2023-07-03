// Interface service for work with media files
import {AxiosRequestConfig} from "axios";
import {MediaFile} from "../MediaLibraryService/interface";

export type UpdateResponse = {
    code: number
    error: string | null
    file: MediaFile
}

export interface MediaFileClientInterface {
    /**
     * Upload new file in library
     * @param licenseType
     * @param file
     * @param mediaInfo
     * @param config
     */
    Upload(
        licenseType,
        file: File,
        mediaInfo: MediaFile,
        config?: AxiosRequestConfig
    ): Promise<MediaFile>

    /**
     * Загрузка файла на сервер без типа лицензии
     * @param file 
     * @param mediaInfo 
     * @param config 
     */
    UploadWithoutLicense(
      file: File,
      mediaInfo: MediaFileWithoutLicense,
      config?: AxiosRequestConfig,
    ): Promise<any>;

    /**
     * Replace old file on new
     * @param id
     * @param file
     * @param mediaInfo
     * @param config
     */
    Replace(
        id: string,
        file: File,
        mediaInfo: MediaFile,
        config?: AxiosRequestConfig
    ): Promise<MediaFile>

    /**
     * Load file from server
     * @param id
     * @param config
     */
    Load(
        id: string,
        config?: AxiosRequestConfig
    ): Promise<Blob>

    /**
     * Get filepath on server
     * @param name
     */
    GetFilePath(name: string, isProject: boolean): Promise<string>
}

//  тип атрибутов для загружаемого файла без типа лицензии
export interface MediaFileWithoutLicense {
  album: string;
  artist: string;
  bpm: number;
  composer: string;
  creator: string;
  creation_date: string,
  file_name: string;
  origin_name: string;
  last_change_date: string;
  hash_sum: string,
  genre: string;
  id: string;
  last_editor: string;
  isrc: string;
  language: string;
  lyricist: string;
  mime_type: string;
  obscene: boolean
  publisher: string;
  title: string;
  year: number;
  duration: number;
  size: number;
  uuid: string;
}

// Сущность с комплексной инфой по отравляемой инфе на сервер и сам файл
export type MediaFileToUploadWithoutLicense = {
  mediaInfo: MediaFileWithoutLicense,
  file: File,
  replace: boolean    //Флаг для перезаписи файла
  replaceId: string,  // ID
  autoReplaceId?: string // ID в случае автоматической замены файлыа
  hasDoubles: boolean,    // Флаг наличия дублей файла
  forceUpload?: boolean // флаг принудительной загрузки
}

