import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { ProjectData } from "services/loaders/allDomainsAndProjects/LoaderQuery";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { MediaFilesDoubles } from "services/MediaLibraryService/interface";
import { makeInputPlaylists } from "./helpers";
import {
  ExportedPlaylistType,
  ProjectPlaylistServiceInterface,
  ProjectPlayListInputObject,
  RefreshCampaignsMutationParams,
  RefreshCampaignsMutationResponse,
  StorePlaylistMutationParams,
  StorePlaylistMutationResponse,
  ProjectPlayListFile,
  GetPlaylistFilesByPlaylistIdQueryParams,
  GetPlaylistFilesByPlaylistIdQueryResponse,
  GetProjectsByPlaylistIDsQueryParams,
  GetProjectsByPlaylistIDsQueryResponse,
} from "./interfaces";
import {} from "./interfaces";
import { GetPlaylistFilesByPlaylistIdQuery } from "./Querys/getFiles";
import { GetProjectsByPlaylistIDsQuery } from "./Querys/getProjects";
import { RefreshCampaignsMutation } from "./Mutations/refreshCampaigns";
import { StorePlaylistMutation } from "./Mutations/storePlaylistMutation";

/**
 * Сервис для работы со списком плэйлистов
 */
export default class ProjectPlaylistService
  implements ProjectPlaylistServiceInterface
{
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
    this.logger = loggerFactory().make(`PlaylistService`);
  }

  /**
   * Получаем сведения о файлах плэйлистов по ИД плэйлистов
   * @param playlistsIDs
   * @returns
   */
  async getFiles(
    playlistsId: string
  ): Promise<ProjectPlayListFile[]> {
    this.logger.Debug("ID плэйлистов: ", playlistsId);

    try {
      const response = await this.client.Query<
        GetPlaylistFilesByPlaylistIdQueryParams,
        GetPlaylistFilesByPlaylistIdQueryResponse
      >(new GetPlaylistFilesByPlaylistIdQuery(playlistsId), {});

      this.logger.Debug("Ответ на запрос файлов для плэйлистов: ", response);

      return response.files.files;
    } catch (error) {
      this.logger.Error("Ошибка запроса файлов плэйлистов: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Получаем список проектов по ID плэйлистов
   * @param playlistsIDs
   * @returns
   */
  async getProjects(playlistsIDs: string[]): Promise<ProjectData[]> {
    this.logger.Debug("ID плэйлистов: ", playlistsIDs);

    try {
      const response = await this.client.Query<
        GetProjectsByPlaylistIDsQueryParams,
        GetProjectsByPlaylistIDsQueryResponse
      >(new GetProjectsByPlaylistIDsQuery(playlistsIDs), {});

      this.logger.Debug("Ответ на запрос проектов для плэйлистов: ", response);

      return response.projects;
    } catch (error) {
      this.logger.Error("Ошибка запроса проектов плэйлистов: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Обновление связных компаний
   * @param playlistIds
   * @returns
   */
  async refreshCampaigns(playlistIds: string[]): Promise<boolean> {
    this.logger.Debug("ID плэйлистов: ", playlistIds);

    try {
      const response = await this.client.Query<
        RefreshCampaignsMutationParams,
        RefreshCampaignsMutationResponse
      >(new RefreshCampaignsMutation(playlistIds), {});

      this.logger.Debug(
        "Ответ мутации обновления связных компаний: ",
        response
      );

      return response.campaignPublishByPlaylists;
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Экспорт плэйлистов
   * @param playlists
   * @param playlistFiles
   * @param projectId
   * @returns
   */
  async storePlaylist(
    playlists: ExportedPlaylistType,
    playlistFiles: MediaFilesDoubles[],
    projectId: string
  ): Promise<string[]> {
    this.logger.Debug(
      "Список файлов для экспортируемых плэйлистов: ",
      playlists
    );
    this.logger.Debug(
      "Список файлов доступных для добавления в плэйлисты: ",
      playlistFiles
    );
    this.logger.Debug("ID проекта: ", projectId);

    try {
      const preparedPlaylists = makeInputPlaylists(
        playlists,
        playlistFiles,
        projectId
      );

      const response = await Promise.all(
        preparedPlaylists.map(async (playlist) => {
          return await this.client.Mutation<
            StorePlaylistMutationParams,
            StorePlaylistMutationResponse
          >(new StorePlaylistMutation(playlist!), {});
        })
      );

      this.logger.Debug("Ответ на запрос проектов для плэйлистов: ", "");

      return response.map((item) => item.result.id);
    } catch (error) {
      this.logger.Error(
        "Ошибка мутации создания плейлистов плэйлистов: ",
        error
      );

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Копирование плейлистов
   * @param playlists
   * @returns
   */
  async copyPlaylists(
    playlists: ProjectPlayListInputObject[]
  ): Promise<string[]> {
    this.logger.Debug("Копии плейлистов: ", playlists);

    try {
      const response = await Promise.all(
        playlists.map(async (playlist) => {
          return await this.client.Mutation<
            StorePlaylistMutationParams,
            StorePlaylistMutationResponse
          >(new StorePlaylistMutation(playlist!), {});
        })
      );

      this.logger.Debug("Ответ на мутации копирования плэйлистов: ", response);

      return response.map((res) => res.result.id);
    } catch (error) {
      this.logger.Error("Ошибка мутации копирования плэйлистов: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }
}
