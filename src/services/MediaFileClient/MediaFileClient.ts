import {MediaFileClientInterface} from "./interface";
import {Axios, AxiosRequestConfig} from "axios";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";

/**
 * Client for job with file on media library server
 */
export default class MediaFileClient implements MediaFileClientInterface {
    private readonly token: string;
    private readonly client: Axios;
    private readonly logger: Logger = loggerFactory().make("MediaFileClient");

    /**
     * @param token
     * @param client
     * @constructor
     */
    constructor(token: string, client: Axios) {
        this.token = token;
        this.client = client;
    }

    /**
     * Get file from server
     * @param fileName
     * @param config
     */
    async Load(fileName: string, config: AxiosRequestConfig = {}): Promise<File> {
        try {
            this.logger.Debug("Load file from server", fileName);
            const result = await this.client.get(
                `/files/${fileName}`,
                {
                    ...config,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            this.logger.Debug('file loaded', result);

            return result;
        } catch (e) {
            throw e
        }
    }

    /**
     * Replace file on server
     * @param id
     * @param file
     * @param config
     */
    async Replace(id: string, file: File, config: AxiosRequestConfig = {}): Promise<any> {
        try {
            this.logger.Debug("Replace file on server", id, file.name);
            const data = new FormData();

            data.append('file', file);

            const result = await this.client.post(
                `/files/fileId/${id}`,
                data,
                {
                    ...config,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            this.logger.Debug('file was replaced', result);

            return result;
        } catch (e) {
            throw e
        }
    }

    /**
     * upload file on server
     * @param licenseType
     * @param file
     * @param config
     */
    async Upload(licenseType, file: File, config: AxiosRequestConfig = {}): Promise<any> {
        try {
            console.log(file)
            this.logger.Debug("Upload file on server", licenseType, file.name);
            const data = new FormData();

            data.append('file', file);

            const result = await this.client.post(
                `/files/upload/${licenseType}`,
                data,
                {
                    ...config,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            this.logger.Debug('file uploaded', result);

            return result;
        } catch (e) {
            throw e
        }
    }
}
