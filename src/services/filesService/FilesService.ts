import {FileData, FilesServiceInterface, FileUploadingSubscriptionData, UploadResult} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {graphQLClient} from "../graphQLClient";
import {FileCloneQuery, FileCloneResponse, FileCloneVars} from "./FileCloneQuery";
import {FileLoadQuery, FileLoadResponse, FileLoadVars} from "./FileLoadingQuery";
import {Subject} from "rxjs";
import axios from "axios";

/**
 * Сервис для работы с файлами
 */
export class FilesService implements FilesServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;
    private readonly uploadEndpoint: string;
    private readonly viewEndpoint: string;
    private readonly token: string;

    /**
     * Конструктор сервиса
     *
     * @param logger
     * @param uploadEndpoint
     * @param viewEndpoint
     * @param token
     */
    constructor(logger: LoggerFactory, uploadEndpoint: string, viewEndpoint: string, token?: string) {
        this.client = graphQLClient(token);
        this.logger = logger.make(`FilesService`);
        this.uploadEndpoint = uploadEndpoint;
        this.viewEndpoint = viewEndpoint;
        this.token = `${token}`
    }

    /**
     * Клонирование переданного списка файлов
     * @param id
     */
    async CloneFiles(id: string[]): Promise<FileData[]> {
        if (0 === id.length) {
            return []
        }

        try {
            const response = await Promise.all(id.map(async id => {
                const result = await this.client.Mutation<FileCloneVars, FileCloneResponse>(
                    new FileCloneQuery({fileId: id}),
                    {}
                );

                return result.file_copy
            }));

            this.logger.Debug(`Cloned files`, response);

            return response
        } catch (e) {
            this.logger.Error(`Failed to clone files`, e);
            return []
        }
    }

    /**
     * Получение ссылки для отображения файла
     * @param file
     */
    GetFileUrl(file: FileData): string {
        return `${this.viewEndpoint}/${file.name}`;
    }

    /**
     * Загрузка списка файлов по переданным ID
     * @param id
     */
    async LoadFilesById(id: string[]): Promise<FileData[]> {
        if (0 === id.length) {
            return []
        }

        try {
            const response = await this.client.Query<FileLoadVars, FileLoadResponse>(
                new FileLoadQuery({ids: id}),
                {}
            );

            this.logger.Debug(`Loaded files`, response.file_list);

            return response.file_list
        } catch (e) {
            this.logger.Error(`Failed to load files`, e);
            return []
        }
    }

    /**
     * Загрузка файлов на сервер
     * @param files
     */
    UploadFiles(files: File[]): UploadResult {
        const subject$ = new Subject<FileUploadingSubscriptionData>();
        const upload = async (): Promise<FileData[]> => {
            const uploaded: FileData[] = [];
            try {
                for (let file of files) {
                    const data = new FormData();
                    data.append('file', file);

                    const result = await axios.post<FileData>(
                        this.uploadEndpoint,
                        data,
                        {
                            onUploadProgress: progressEvent => {
                                subject$.next({
                                    progress: Math.round((progressEvent.loaded * 100) / progressEvent.total),
                                    file: file.name,
                                });
                            },
                            headers: {
                                Authorization: this.token,
                            },
                        },
                    );

                    this.logger.Debug(`Uploaded file`, result.data);
                    uploaded.push(result.data);
                }
            } catch (e) {
                this.logger.Error(`Failed to upload files`, e);
                return []
            }

            subject$.complete();
            return uploaded
        };

        return {
            subscription: subject$.asObservable(),
            upload,
        };
    }
}