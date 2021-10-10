import {ExcelFileServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {ExcelFileServiceCreateQuery, ExcelFileServiceCreateQueryResult} from "./ExcelFileServiceCreateQuery";
import {DeleteFileQuery} from "./DeleteFileQuery";

// Сервис для работы с файлами Excel
export class ExcelFileService implements ExcelFileServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ExcelFileService`);
    }

    /**
     * Создание нового файла Excel
     * @param name
     * @param companyId
     * @param data
     */
    async CreateFile(name: string, companyId: number, data: string[][]): Promise<string> {
        try {
            const resp = await this.client.Mutation<{ data: any }, ExcelFileServiceCreateQueryResult>(
                new ExcelFileServiceCreateQuery(name, companyId, data),
                {}
            );

            this.logger.Debug(`Creation file result`, resp);

            return resp.result.id
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to create Excel file`);
        }
    }

    /**
     * Удаление файла Excel
     * @param fileId
     */
    async DeleteFile(fileId: string): Promise<void> {
        try {
            await this.client.Mutation<{ fileId: string }, void>(
                new DeleteFileQuery(fileId),
                {}
            );

            this.logger.Debug(`Excel file deleted`);
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to delete Excel file`);
        }
    }
}