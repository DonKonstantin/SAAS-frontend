import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { ProjectData } from "services/loaders/allDomainsAndProjects/LoaderQuery";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { GetPlaylistFilesByPlaylistIDsQueryParams, GetPlaylistFilesByPlaylistIDsQueryResponse, GetProjectsByPlaylistIDsQueryParams, GetProjectsByPlaylistIDsQueryResponse, ProjectPlaylistServiceInterface, RefreshCampaignsMutationParams, RefreshCampaignsMutationResponse } from "./interfaces";
import { GetPlaylistFilesByPlaylistIDsQuery } from "./Querys/getFiles";
import { GetProjectsByPlaylistIDsQuery } from "./Querys/getProjects";
import { RefreshCampaignsMutation } from "./Querys/refreshCampaigns";

/**
 * Сервис для работы со списком плэйлистов
 */
export default class ProjectPlaylistService implements ProjectPlaylistServiceInterface {
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
  async getFiles(playlistsIDs: string[]): Promise<GetPlaylistFilesByPlaylistIDsQueryResponse> {
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
  };

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
  };

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

      this.logger.Debug("Ответ мутации обновления связных компаний: ", response);

      return response.campaignPublishByPlaylists;
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };
};