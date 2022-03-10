// Interface service for work with media files
import {AxiosRequestConfig} from "axios";
import {MediaFile} from "../MediaLibraryService/interface";

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
    GetFilePath(name: string): Promise<string>
}
