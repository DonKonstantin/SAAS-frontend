import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import {
  GetChannelsByNameQueryParams,
  GetChannelsByNameQueryResponse,
  ProjectChannelsServiceInterface,
} from "./interface";
import { GetChannelsByNameQuery } from "./Queries/GetChannelsByNameQuery";

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
   * Получения списка каналов по ID проекта
   * @param projectId
   * @returns
   */
  async getChannels(
    projectId: string,
  ): Promise<ProjectChannel[]> {
    this.logger.Debug("ID проекта: ", projectId);

    try {
      const { channels } = await this.client.Query<
        GetChannelsByNameQueryParams,
        GetChannelsByNameQueryResponse
      >(new GetChannelsByNameQuery(projectId), {});

      this.logger.Debug("Полученный спискок каналов: ", channels);

      return channels;
    } catch (error) {
      this.logger.Debug("Ошибка получения списка каналов: ", error);

      throw Error(error);
    }
  }
}
