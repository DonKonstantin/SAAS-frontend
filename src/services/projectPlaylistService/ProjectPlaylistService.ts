import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { ProjectData } from "services/loaders/allDomainsAndProjects/LoaderQuery";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { MediaFilesDoubles } from "services/MediaLibraryService/interface";
import { makeInputPlaylists } from "./helpers";
import {
  ExportedPlaylistType,
  GetPlaylistFilesByPlaylistIDsQueryParams,
  GetPlaylistFilesByPlaylistIDsQueryResponse,
  GetProjectsByPlaylistIDsQueryParams,
  GetProjectsByPlaylistIDsQueryResponse,
  ProjectPlayList,
  ProjectPlaylistServiceInterface,
} from "./interfaces";
import {
  StorePlaylistMutation,
  StorePlaylistMutationParams,
  StorePlaylistMutationResponse,
} from "./Mutations/StorePlaylistMutation";
import { GetPlaylistFilesByPlaylistIDsQuery } from "./Querys/getFiles";
import { GetProjectsByPlaylistIDsQuery } from "./Querys/getProjects";

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
    playlistsIDs: string[]
  ): Promise<GetPlaylistFilesByPlaylistIDsQueryResponse> {
    this.logger.Debug("ID плэйлистов: ", playlistsIDs);

    try {
      const response = await this.client.Query<
        GetPlaylistFilesByPlaylistIDsQueryParams,
        GetPlaylistFilesByPlaylistIDsQueryResponse
      >(new GetPlaylistFilesByPlaylistIDsQuery(playlistsIDs), {});

      this.logger.Debug("Ответ на запрос файлов для плэйлистов: ", response);

      return response;
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

  async storePlaylist(
    playlists: ExportedPlaylistType,
    playlistFiles: MediaFilesDoubles[],
    projectId: string
  ): Promise<StorePlaylistMutationResponse> {
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
      const preparedPlaylists = makeInputPlaylists(playlists, playlistFiles, projectId);

      const response = await Promise.all(
        preparedPlaylists.map(async playlist => {
          return await this.client.Query<
          StorePlaylistMutationParams,
          StorePlaylistMutationResponse
        >(new StorePlaylistMutation(playlist!), {})
        })
      );

      console.log(response, "response");

      this.logger.Debug("Ответ на запрос проектов для плэйлистов: ", "");

      // return response;
      return {
        result: {
          id: '1'
        }
      }
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
}
