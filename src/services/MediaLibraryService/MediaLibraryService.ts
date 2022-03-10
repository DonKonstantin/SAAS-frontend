import {MediaFilesDoubles, MediaFile, MediaLibraryServiceInterface} from "./interface";
import {
    SearchMediaFilesDoublesParams,
    SearchMediaFilesDoublesQuery,
    SearchMediaFilesDoublesResponse
} from "./query/SearchMediaFilesDoublesQuery";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";

/**
 * Сервис по работе с сущностью медиа-файла
 */
export default  class MediaLibraryService implements MediaLibraryServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger = loggerFactory().make(`MediaLibraryService`);

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    async delete(id: string[]): Promise<MediaFile[]> {
        console.log(id)
        return Promise.resolve([]);
    }

    async load(id: string[]): Promise<MediaFile[]> {
        console.log(id)

        return Promise.resolve([]);
    }

    async update(files: MediaFile[]): Promise<MediaFile[]> {
        console.log(files)
        return Promise.resolve([]);
    }

    async findDoubles(fileNames: string[]): Promise<MediaFilesDoubles[]> {
        if (fileNames.length === 0) {
            return [];
        }

        try {
            this.logger.Debug("Start find doubles for file names:", fileNames);
            const {searchMediaFilesDoubles} = await this.client.Query<SearchMediaFilesDoublesParams,SearchMediaFilesDoublesResponse>(
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
