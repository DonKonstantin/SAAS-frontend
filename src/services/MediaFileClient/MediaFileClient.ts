import {MediaFileClientInterface, UpdateResponse} from "./interface";
import {Axios, AxiosRequestConfig, AxiosRequestHeaders} from "axios";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import {MediaFile} from "../MediaLibraryService/interface";
import {getMainFileApiLink} from "./helpers";
import {getAuthorizationToken} from "../../context/AuthorizationContext";

const prepareFormdata = (file: File, mediaInfo: MediaFile): FormData => {
    const data = new FormData();

    data.append('file', file);

    Object.entries(mediaInfo).map(([field, value]) => {
        data.append(field, value as string)
    })

    return data;
}

/**
 * Client for job with file on media library server
 */
export default class MediaFileClient implements MediaFileClientInterface {
    private readonly client: Axios;
    private readonly logger: Logger = loggerFactory().make("MediaFileClient");

    /**
     * @param client
     * @constructor
     */
    constructor( client: Axios) {
        this.client = client;
    }

    /**
     * Get file from server
     * @param fileName
     * @param config
     */
    async Load(fileName: string, config: AxiosRequestConfig = {}): Promise<Blob> {
        try {
            this.logger.Debug("Load file from server", fileName);
            const headers = await this.getHeaders(config.headers || {});

            const {data: result} = await this.client.get<Blob>(
                `/file/${fileName}`,
                {
                    ...config,
                    responseType: "blob",
                    headers: {
                        ...headers
                    },
                }
            );

            this.logger.Debug('file loaded', result);

            return new Blob([result]);
        } catch (e) {
            throw e
        }
    }

    /**
     * Replace file on server
     * @param id
     * @param file
     * @param mediaInfo
     * @param config
     */
    async Replace(id: string, file: File, mediaInfo: MediaFile, config: AxiosRequestConfig = {}): Promise<MediaFile> {
        try {
            this.logger.Debug("Replace file on server", id, file.name);
            const formData = prepareFormdata(file, mediaInfo);
            const headers = await this.getHeaders(config.headers || {});

            const data = await this.client.post(
                `/files/replace/${id}`,
                formData,
                {
                    ...config,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        ...headers
                    },
                }
            );

            const result: UpdateResponse  = JSON.parse(data.data);

            if (result.code !== 200) {
                throw new Error("Error upload file")
            }

            this.logger.Debug('file was replaced', result.file);

            return result.file;
        } catch (e) {
            throw e
        }
    }

    /**
     * upload file on server
     * @param licenseType
     * @param file
     * @param mediaInfo
     * @param config
     */
    async Upload(licenseType, file: File, mediaInfo: MediaFile, config: AxiosRequestConfig = {}): Promise<MediaFile> {
        try {
            this.logger.Debug("Upload file on server", licenseType, file.name);
            const formData = prepareFormdata(file, mediaInfo);
            const headers = await this.getHeaders(config.headers || {});

            const data  = await this.client.post(
                `/files/upload/${licenseType}`,
                formData,
                {
                    ...config,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        ...headers
                    },
                }
            );

            const result: UpdateResponse  = JSON.parse(data.data);

            if (result.code !== 200) {
                throw new Error("Error upload file")
            }

            this.logger.Debug('file uploaded', result.file);

            return result.file;
        } catch (e) {
            throw e
        }
    }

    async GetFilePath(name: string): Promise<string> {
        return `${getMainFileApiLink()}/file/${name}`;
    }

    /**
     * Генерация базовых заголовков для запроса
     *
     * @param baseHeaders
     */
    private async getHeaders(baseHeaders: AxiosRequestHeaders | undefined): Promise<AxiosRequestHeaders> {
        let token: string = getAuthorizationToken();

        if (!token || 0 === token.length) {
            return {...baseHeaders}
        }

        return {
            ...baseHeaders,
            Authorization: token,
        };
    }
}
