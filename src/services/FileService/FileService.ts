import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import {
  MediaFile,
  ProjectMediaFile,
} from "services/MediaLibraryService/interface";
import {
  FileServiceInterface,
} from "./interfaces";
import GetFilesListByFileIdsQuery from "./Queries/getFilesListByFileIdsQuery";
import GetProjectFilesListByFileIdsQuery from "./Queries/getProjectFilesListByFileIdsQuery";
import {
  DeleteProjectFileByFileIdsParams,
  DeleteProjectFileByFileIdsResponse,
  GetFilesListByFileIdsQueryParams,
  GetFilesListByFileIdsQueryResponse,
  GetProjectFilesListByFileIdsQueryParams,
  GetProjectFilesListByFileIdsQueryResponse,
  GetProjectFilesListByProjectIdQueryParams,
  GetProjectFilesListByProjectIdQueryResponse,
} from "./types";
import GetProjectFilesListByProjectIdQuery from "./Queries/getProjectFilesListByProjectIdQuery";
import DeleteProjectFilesByFileNames from "./Mutations/deleteProjectFileByFileIds";

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

  /**
   * Get project files by project id
   * @param projectsId
   */
  async getProjectFilesByProjectId(projectsId: string): Promise<ProjectMediaFile[]> {
    this.logger.Debug("Get project files by project id");
    this.logger.Debug("Project ID: ", projectsId);

    try {
      const response = await this.client.Query<
        GetProjectFilesListByProjectIdQueryParams,
        GetProjectFilesListByProjectIdQueryResponse
      >(new GetProjectFilesListByProjectIdQuery(projectsId), {});
      this.logger.Debug(" Get project files by project id response: ", response);

      //  Mark file as project file loaded by project ID
      const withFlag = response.result.map(file => ({
        ...file,
        isFreeProjectFile: true,
      }));

      return withFlag;
    } catch (error) {
      this.logger.Error(" Get project files by project id error: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };

  /**
   * Delete project files by file IDs
   * @param fileNames
   */
  async deleteProjectFilesByFileIds(fileIds: string[]): Promise<number> {
    this.logger.Debug("Delete project files by file IDs");
    this.logger.Debug("Files IDs: ", fileIds);

    try {
      const { project_file_delete: { affected_rows } } = await this.client.Query<
        DeleteProjectFileByFileIdsParams,
        DeleteProjectFileByFileIdsResponse
      >(new DeleteProjectFilesByFileNames(fileIds), {});
      this.logger.Debug(" Delete project files by file IDs response: ", affected_rows);

      return affected_rows;
    } catch (error) {
      this.logger.Error(" Delete project files by file IDs error: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }
};
