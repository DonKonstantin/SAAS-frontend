import {MediaFile, MediaFilesDoubles, MediaLibraryServiceInterface} from "./interface";
import {
    SearchMediaFilesDoublesParams,
    SearchMediaFilesDoublesQuery,
    SearchMediaFilesDoublesResponse
} from "./query/SearchMediaFilesDoublesQuery";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import {
    DeleteFilesByIdMutation,
    DeleteFilesByIdMutationParams,
    DeleteFilesByIdMutationResponse
} from "./query/DeleteFilesByIdMutation";
import {
    FileUpdateSetType,
    UpdateFilesByIdMutation,
    UpdateFilesByIdMutationResponse
} from "./query/UpdateFilesByIdMutation";

/**
 * Сервис по работе с сущностью медиа-файла
 */
export default class MediaLibraryService implements MediaLibraryServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger = loggerFactory().make(`MediaLibraryService`);

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    async delete(ids: string[]): Promise<number> {
        if (ids.length === 0) {
            return 0
        }

        try {
            this.logger.Debug("delete files by ids: ", ids);
            const {file_delete} = await this.client.Query<DeleteFilesByIdMutationParams, DeleteFilesByIdMutationResponse>(
                new DeleteFilesByIdMutation(ids),
                {}
            );
            this.logger.Debug("Count deleted files: ", file_delete.affected_rows);

            return file_delete.affected_rows;
        } catch (e) {
            this.logger.Error(e)
            throw e
        }
    }

    async load(_id: string[]): Promise<MediaFile[]> {
        return Promise.resolve([]);
    }

    async update(ids: string[],fields:FileUpdateSetType): Promise<number> {
        if (ids.length === 0) {
            return 0
        }

        try {
            this.logger.Debug("update files by ids: ", ids);
            const {file_data_update} = await this.client.Query<DeleteFilesByIdMutationParams, UpdateFilesByIdMutationResponse>(
                new UpdateFilesByIdMutation(ids,fields),
                {}
            );
            this.logger.Debug("Count updated files: ", file_data_update.affected_rows);

            return file_data_update.affected_rows;
        } catch (e) {
            this.logger.Error(e)
            throw e
        }
    }

    async findDoubles(fileNames: string[]): Promise<MediaFilesDoubles[]> {
        if (fileNames.length === 0) {
            return [];
        }

        try {
            this.logger.Debug("Start find doubles for file names:", fileNames);
            const {searchMediaFilesDoubles} = await this.client.Query<SearchMediaFilesDoublesParams, SearchMediaFilesDoublesResponse>(
                new SearchMediaFilesDoublesQuery(fileNames),
                {}
            );
            this.logger.Debug("Result find doubles for file names:", searchMediaFilesDoubles);

            return searchMediaFilesDoubles;
        } catch (e) {
            this.logger.Error(e)
            throw e
        }
    }
}
