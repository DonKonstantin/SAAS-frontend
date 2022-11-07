import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { MediaFilesDoubles } from "services/MediaLibraryService/interface";
import { makeInputPlaylists } from "./helpers";
import {
  ExportedPlaylistType,
  GetCampaignsByPlaylistIDsQueryParams,
  GetCampaignsByPlaylistIDsQueryResponse,
  GetCampaignsIdByNameQueryParams,
  GetCampaignsIdByNameQueryResponse,
  GetPlaylistFilesByPlaylistIdQueryParams,
  GetPlaylistFilesByPlaylistIdQueryResponse,
  GetPlaylistFilesByPlaylistIdsQueryParams,
  GetPlaylistFilesByPlaylistIdsQueryResponse,
  GetPlaylistsCampaignByNameParams,
  GetPlaylistsCampaignByNameResponse,
  GetPlaylistsIdByCampaignsIdQueryParams,
  GetPlaylistsIdByCampaignsIdQueryResponse,
  PlaylistCampaignsNameType,
  PlaylistsResponseType,
  ProjectPlayList,
  ProjectPlayListFile,
  ProjectPlayListInputObject,
  ProjectPlaylistServiceInterface,
  RefreshCampaignsMutationParams,
  RefreshCampaignsMutationResponse,
  StorePlaylistMutationParams,
  StorePlaylistMutationResponse,
} from "./interfaces";
import { GetPlaylistFilesByPlaylistIdQuery } from "./Querys/getFiles";
import { GetCampaignsByPlaylistIDsQuery } from "./Querys/getCampaigns";
import { RefreshCampaignsMutation } from "./Mutations/refreshCampaigns";
import { GetPlaylistFilesByPlaylistIdsQuery } from "./Querys/getFilesByPlaylistsId";
import { GetCampaignsIdByNameQuery } from "./Querys/getCampignsId";
import { GetPlaylistsIdByCampaignsIdQuery } from "./Querys/getPlaylistsId";
import { StorePlaylistMutation } from "./Mutations/storePlaylist";
import { GetCampaignsProjectPlaylistQuery } from "./Querys/getProjectPlaylist";
import { StorePlaylistByFileMutation } from "./Mutations/storePlaylistByFile";

/**
 * Сервис для работы со списком плэйлистов
 */
export default class ProjectPlaylistService
  implements ProjectPlaylistServiceInterface {
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
   * @param playlistsId
   * @returns
   */
  async getFiles(
    playlistsId: string
  ): Promise<ProjectPlayListFile[]> {
    this.logger.Debug("ID плэйлистов: ", playlistsId);

    try {
      const response = await this.client.Query<GetPlaylistFilesByPlaylistIdQueryParams,
        GetPlaylistFilesByPlaylistIdQueryResponse>(new GetPlaylistFilesByPlaylistIdQuery(playlistsId), {});

      this.logger.Debug("Ответ на запрос файлов для плэйлистов: ", response);

      return response.files[0].files;
    } catch (error) {
      this.logger.Error("Ошибка запроса файлов плэйлистов: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };

  /**
   * Получаем сведения о файлах плэйлистов по ИД плэйлистов
   * @param playlistIds
   * @returns
   */
  async getFilesByPlaylistIds(
    playlistIds: string[]
  ): Promise<GetPlaylistFilesByPlaylistIdsQueryResponse> {
    this.logger.Debug("ID плэйлистов: ", playlistIds);

    try {
      const response = await this.client.Query<GetPlaylistFilesByPlaylistIdsQueryParams,
        GetPlaylistFilesByPlaylistIdsQueryResponse>(new GetPlaylistFilesByPlaylistIdsQuery(playlistIds), {});

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
  async getCampaigns(playlistsIDs: string[]): Promise<PlaylistCampaignsNameType[]> {
    this.logger.Debug("ID плэйлистов: ", playlistsIDs);

    try {
      const response = await this.client.Query<GetCampaignsByPlaylistIDsQueryParams,
        GetCampaignsByPlaylistIDsQueryResponse>(new GetCampaignsByPlaylistIDsQuery(playlistsIDs), {});

      this.logger.Debug("Ответ на запрос проектов для плэйлистов: ", response);

      return response.campaigns;
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
      const response = await this.client.Query<RefreshCampaignsMutationParams,
        RefreshCampaignsMutationResponse>(new RefreshCampaignsMutation(playlistIds), {});

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
  };

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
          return await this.client.Mutation<StorePlaylistMutationParams,
            StorePlaylistMutationResponse>(new StorePlaylistMutation(playlist!), {});
        })
      );

      this.logger.Debug("Ответ на запрос проектов для плэйлистов: ", "");

      return response.map((item) => item.result.id!);
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
  };

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
          return await this.client.Mutation<StorePlaylistMutationParams,
            StorePlaylistMutationResponse>(new StorePlaylistMutation(playlist!), {});
        })
      );

      this.logger.Debug("Ответ на мутации копирования плэйлистов: ", response);

      return response.map((res) => res.result.id!);
    } catch (error) {
      this.logger.Error("Ошибка мутации копирования плэйлистов: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };

  /**
   * Сохраняем изменения в плэйлисте
   * @param playlist
   * @returns
   */
  async storePlaylistChanges(playlist: ProjectPlayListInputObject): Promise<ProjectPlayList> {
    this.logger.Debug("Данные плэйлиста для сохранения: ", playlist);

    try {
      const response = await this.client.Mutation<StorePlaylistMutationParams,
        StorePlaylistMutationResponse>(new StorePlaylistMutation(playlist), {});

      this.logger.Debug("Ответ на мутацию сохранения плэйлиста: ", response);

      return response.result;
    } catch (error) {
      this.logger.Error("Ошибка мутации сохранения плэйлиста: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };

  /**
   * Получаем список ID кампаний по имени
   * @param campaignName
   * @param projectId
   * @returns
   */
  async getCampaignsIdByName(campaignName: string, projectId: string): Promise<any> {
    this.logger.Debug("Имя кампании: ", campaignName);

    try {
      const response = await this.client.Mutation<GetCampaignsIdByNameQueryParams,
        GetCampaignsIdByNameQueryResponse>(new GetCampaignsIdByNameQuery(campaignName, projectId), {});

      this.logger.Debug("Ответ на запрос массива ID кампаний по имени: ", response);

      return response.campaignsId.map(item => item.id);
    } catch (error) {
      this.logger.Error("Ошибка запроса массива ID кампаний по имени: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };

  /**
   * Получаем список ID плэйлистов по списку ID кампаний
   * @param campignsId
   */
  async getPlaylistsIdByCampignsId(campignsId: string[]): Promise<string[]> {
    this.logger.Debug("Список ID кампаний: ", campignsId);

    try {
      const response = await this.client.Mutation<GetPlaylistsIdByCampaignsIdQueryParams,
        GetPlaylistsIdByCampaignsIdQueryResponse>(new GetPlaylistsIdByCampaignsIdQuery(campignsId), {});

      this.logger.Debug("Ответ на запрос массива ID плэйлистов по массиву ID кампаний: ", response);

      return response.campaignsId;
    } catch (error) {
      this.logger.Error("Ошибка запроса массива ID кампаний по имени массиву ID кампаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };

  /**
   * Получаем список плейлистов по названию
   * @param playlistName
   */
  async getPlaylistsByName(playlistName: string): Promise<PlaylistsResponseType[]> {
    this.logger.Debug("Список плейлистов по названию: ", playlistName);

    try {
      const response = await this.client.Query<GetPlaylistsCampaignByNameParams,
        GetPlaylistsCampaignByNameResponse>(new GetCampaignsProjectPlaylistQuery(playlistName), {});

      this.logger.Debug("Ответ на запрос плэйлистов: ", response);

      return (
        [
          {
            duration: 123,
            files: [{}, {}, {}],
            id: '123',
            is_overall_volume: false,
            name: 'string',
            overall_volume: 10,
            project_id: "12",
          },
          {
            duration: 12,
            files: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
            id: '12',
            is_overall_volume: true,
            name: 'string123',
            overall_volume: 30,
            project_id: "12",
          },
          {
            duration: 12222,
            files: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            id: '121',
            is_overall_volume: true,
            name: 'string2222',
            overall_volume: 50,
            project_id: "12",
          }
        ])

      // return response;
    } catch (error) {
      this.logger.Error("Ошибка запроса плэйлистов: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };

  /**
   * Создание плейлиста по загрузке файла
   * @param playlistFiles
   * @param projectId
   * @returns
   */
  async storePlaylistByFile(
    playlistFiles: MediaFilesDoubles[],
    projectId: number
  ): Promise<ProjectPlayList> {
    this.logger.Debug(
      "Список файлов для экспортируемых плэйлистов: ",
      // playlists
    );
    this.logger.Debug(
      "Список файлов доступных для добавления в плэйлисты: ",
      playlistFiles
    );
    this.logger.Debug("ID проекта: ", projectId);

    try {

      const playlist = {
        files: [],
        projectId: projectId,
        name: playlistFiles[0].fileName,
        isOverallVolume: true,
        overallVolume: 100
      }

      const response = await this.client.Mutation<StorePlaylistMutationParams,
        StorePlaylistMutationResponse>(new StorePlaylistByFileMutation(playlist), {});

      this.logger.Debug("Ответ на запрос проектов для плэйлистов: ", "");

      return response.result;
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
  };

}
