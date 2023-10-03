import {MediaFileClientInterface, MediaFileWithoutLicense, UpdateResponse} from "./interface";
import {Axios, AxiosRequestConfig, AxiosRequestHeaders} from "axios";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import {MediaFile} from "../MediaLibraryService/interface";
import {getMainFileApiLink, prepareFormdata, prepareFormdataWithoutLicense} from "./helpers";
import {getAuthorizationToken, getCurrentState} from "../../context/AuthorizationContext";

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
    async Load(fileName: string, isProject: boolean = false, config: AxiosRequestConfig = {}): Promise<Blob> {

        try {
            this.logger.Debug("Load file from server", fileName);
            const headers = await this.getHeaders(config.headers || {});

            const {data: result} = await this.client.get<Blob>(
                `/${isProject ? "project-files" : "file"}/${fileName}`,
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

            if (data.status !== 200) {
              throw new Error("Error upload file")
            }
            
            const result: UpdateResponse  = JSON.parse(data.data);

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
            
            if (data.status !== 200) {
              throw new Error("Error upload file")
            }
            
            const result: UpdateResponse  = JSON.parse(data.data);

            this.logger.Debug('file uploaded', result.file);

            return result.file;
        } catch (e) {
            throw e
        }
    }

    /**
     * Загрузка файла на сервер без типа лицензии
     * @param file 
     * @param mediaInfo 
     * @param config 
     * @returns 
     */
    async UploadWithoutLicense(file: File, mediaInfo: MediaFileWithoutLicense, config: AxiosRequestConfig = {}): Promise<any> {
      this.logger.Debug("Имя загружаемого файла: ", file.name);
      this.logger.Debug("Атрибуты загружаемого файла: ", mediaInfo);

      try {
        const formData = prepareFormdataWithoutLicense(file, mediaInfo);

        const headers = await this.getHeaders(config.headers || {});

        const {project} = getCurrentState();

        const data  = await this.client.post(
            `/project/${project}/files/upload?authorization=${headers.Authorization}`,
            formData,
            {
                ...config,
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...headers
                },
            }
        );

        // const result: UpdateResponse  = JSON.parse(data.data);

        // if (result.code !== 200) {
        //     throw new Error("Error upload file")
        // }

        // this.logger.Debug('file uploaded', result.file);

        // return result.file;

        return data;
      } catch (e) {
        throw e
      }
    }

    async GetFilePath(name: string, isProject: boolean): Promise<string> {
        return `${getMainFileApiLink()}/${isProject ? "project-files" : "file"}/${name}`;
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
