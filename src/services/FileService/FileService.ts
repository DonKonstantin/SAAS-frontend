import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import {
  MediaFile,
  ProjectMediaFile,
} from "services/MediaLibraryService/interface";
import {
  FileServiceInterface,
  GetFilesListByFileIdsQueryParams,
  GetFilesListByFileIdsQueryResponse,
  GetProjectFilesListByFileIdsQueryParams,
  GetProjectFilesListByFileIdsQueryResponse,
} from "./interfaces";
import GetFilesListByFileIdsQuery from "./Queries/getFilesListByFileIdsQuery";
import GetProjectFilesListByFileIdsQuery from "./Queries/getProjectFilesListByFileIdsQuery";

/**
 * Сервис работы с фалами
 */
export class FileService implements FileServiceInterface {
  // Клиент GraphQL API
  private readonly client: GraphQLClient;

  //  Логгер
  private readonly logger: Logger;

  /**
   * Конструктор сервиса
   * @param client
   */
  constructor(client: GraphQLClient) {
    this.client = client;
    this.logger = loggerFactory().make(`FileService`);
  }

  /**
   * Получаем список файлов по масиву ID
   * @param fileIds
   * @returns
   */
  async getFilesListByFileIds(fileIds: string[]): Promise<MediaFile[]> {
    this.logger.Debug("ID файлов для загрузки: ", fileIds);

    try {
      const response = await this.client.Query<
        GetFilesListByFileIdsQueryParams,
        GetFilesListByFileIdsQueryResponse
      >(new GetFilesListByFileIdsQuery(fileIds), {});

      this.logger.Debug("Ответ на запроса списка файлов по ID: ", response);

      return response.files;
    } catch (error) {
      this.logger.Error("Ошибка запроса списка файлов по ID: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Запрос списка файлов проекта
   * @param fileIds
   * @returns
   */

  async getProjectFilesListByFileIds(
    fileIds: string[]
  ): Promise<ProjectMediaFile[]> {
    this.logger.Debug("ID файлов для загрузки: ", fileIds);

    try {
      const response = await this.client.Query<
        GetProjectFilesListByFileIdsQueryParams,
        GetProjectFilesListByFileIdsQueryResponse
      >(new GetProjectFilesListByFileIdsQuery(fileIds), {});
      this.logger.Debug("Ответ на запроса списка файлов по ID: ", response);

      return response.result;
    } catch (error) {
      this.logger.Error("Ошибка запроса списка файлов по ID: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }
}
