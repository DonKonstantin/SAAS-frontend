import {GraphQLClient} from "services/graphQLClient/GraphQLClient";
import {loggerFactory} from "services/logger";
import {Logger} from "services/logger/Logger";
import {ProjectChannel} from "services/playerCodeService/interfaces";
import {
  GetChannelsByNameQueryParams,
  GetChannelsByNameQueryResponse,
  ProjectChannelsServiceInterface,
} from "./interface";
import {GetChannelsByNameQuery} from "./Queries/GetChannelsByNameQuery";
import {
  CheckCountChannelsByProjectIDQuery,
  CheckCountChannelsByProjectIDQueryParams,
  CheckCountChannelsByProjectIDQueryResponse
} from "../playerCodeService/Querys/CheckCountChannelsByProjectID";

/**
 * Сервис авторизации пользователя
 */
export class ProjectChannelsService implements ProjectChannelsServiceInterface {
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
    this.logger = loggerFactory().make(`Campaign list service`);
  }

  /**
   * Проверка кол-ва доступных канналов
   * @param projectId
   * @returns
   */
  async checkCountChannels(projectId: string, isActive?: boolean): Promise<number> {
    this.logger.Debug("The player code to check count channels: ", projectId);

    try {
      const {channels} = await this.client.Query<
          CheckCountChannelsByProjectIDQueryParams, CheckCountChannelsByProjectIDQueryResponse
      >(new CheckCountChannelsByProjectIDQuery(projectId, isActive), {});

      this.logger.Debug("The player code check count channels response: ", channels);

      return channels[0].count;
    } catch (error) {
      this.logger.Error("The player code check count channels error: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Получения списка каналов по ID проекта
   * @param projectId
   * @returns
   */
  async getChannels(
    projectId: string,
    isActive?: boolean,
  ): Promise<ProjectChannel[]> {
    this.logger.Debug("ID проекта: ", projectId);

    try {
      const limit = await this.checkCountChannels(projectId, isActive);

      if(limit){
        const { channels } = await this.client.Query<
            GetChannelsByNameQueryParams,
            GetChannelsByNameQueryResponse
        >(new GetChannelsByNameQuery(projectId, limit, isActive), {});

        this.logger.Debug("Полученный спискок каналов: ", channels);
        return channels;
      }
        this.logger.Debug("The player code check channels equal 0");
        return [];
    } catch (error) {
      this.logger.Debug("Ошибка получения списка каналов: ", error);

      throw Error(error);
    }
  }
}
