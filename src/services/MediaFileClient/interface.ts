// Interface service for work with media files
import {AxiosRequestConfig} from "axios";

export interface MediaFileClientInterface {
    /**
     * Upload new file in library
     * @param licenseType
     * @param file
     * @param config
     */
    Upload(
        licenseType,
        file: File,
        config?: AxiosRequestConfig
    ): Promise<any>

    /**
     * Replace old file on new
     * @param id
     * @param file
     * @param config
     */
    Replace(
        id: string,
        file: File,
        config?: AxiosRequestConfig
    ): Promise<any>

    /**
     * Load file from server
     * @param id
     * @param config
     */
    Load(
        id: string,
        config?: AxiosRequestConfig
    ): Promise<File>
}
