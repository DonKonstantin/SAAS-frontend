import {MediaFileClientInterface} from "./interface";
import {Axios, AxiosRequestConfig} from "axios";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import {MediaFile} from "../MediaLibraryService/interface";
import {getMainFileApiLink} from "./helpers";

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
    async Load(fileName: string, config: AxiosRequestConfig = {}): Promise<string> {
        try {
            this.logger.Debug("Load file from server", fileName);
            const {data: result} = await this.client.get<string>(
                `/file/${fileName}`,
                {
                    ...config,
                }
            );

            this.logger.Debug('file loaded', result);

            return result as string;
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
            const data = prepareFormdata(file, mediaInfo);

            const {data: result} = await this.client.post<MediaFile>(
                `/files/replace/${id}`,
                data,
                {
                    ...config,
                    headers: {"Content-Type": "multipart/form-data"},
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
     * @param mediaInfo
     * @param config
     */
    async Upload(licenseType, file: File, mediaInfo: MediaFile, config: AxiosRequestConfig = {}): Promise<MediaFile> {
        try {
            this.logger.Debug("Upload file on server", licenseType, file.name);
            const data = prepareFormdata(file, mediaInfo);

            const {data: result} = await this.client.post<MediaFile>(
                `/files/upload/${licenseType}`,
                data,
                {
                    ...config,
                    headers: {"Content-Type": "multipart/form-data"},
                }
            );

            this.logger.Debug('file uploaded', result);

            return result;
        } catch (e) {
            throw e
        }
    }

    async GetFilePath(name: string): Promise<string> {
        return `${getMainFileApiLink()}/file/${name}`;
    }
}
