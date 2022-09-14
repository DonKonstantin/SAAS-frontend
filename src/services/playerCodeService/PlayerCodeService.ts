import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { PlayerCodeServiceInterface, ProjectChannel } from "./interfaces";
import {
  CheckCodeIsFreeQuery,
  CheckCodeIsFreeQueryParams,
  CheckCodeIsFreeQueryResponse,
} from "./Querys/CheckCodeIsFree";
import {
  GetChannelsByProjectIDQuery,
  GetChannelsByProjectIDQueryParams,
  GetChannelsByProjectIDQueryResponse,
} from "./Querys/GetChannelsByProjectID";

/**
 * Сервис кодов плееров
 */
export class PlayerCodeService implements PlayerCodeServiceInterface {
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
    this.logger = loggerFactory().make(`PlayerCodeService`);
  }

  /**
   * Проверка занят ли код в системе
   * @param code
   * @returns
   */
  async checkPlayerCode(code: string): Promise<boolean> {
    this.logger.Debug("The player code to check if it is free: ", code);

    try {
      const response = await this.client.Query<
        CheckCodeIsFreeQueryParams,
        CheckCodeIsFreeQueryResponse
      >(new CheckCodeIsFreeQuery(code), {});

      this.logger.Debug("The player code check response: ", response);

      return !!response.codes_count.count;
    } catch (error) {
      this.logger.Error("The player code check error: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  async getChannels(projectId: string): Promise<ProjectChannel[]> {
    this.logger.Debug("A project ID: ", projectId);

    try {
      const response = await this.client.Query<
        GetChannelsByProjectIDQueryParams,
        GetChannelsByProjectIDQueryResponse
      >(new GetChannelsByProjectIDQuery(projectId), {});

      this.logger.Debug("The player code check response: ", response);

      return response.channels;
    } catch (error) {
      this.logger.Error("The player code check error: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }
}
