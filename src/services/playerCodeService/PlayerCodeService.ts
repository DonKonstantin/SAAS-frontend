import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { PlayerCodeServiceInterface, ProjectChannel } from "./interfaces";
import {
  DeactivatePlayerCodeMutation,
  DeactivatePlayerCodeMutationParams,
  DeactivatePlayerCodeMutationResponse,
} from "./Mutations/DeactivatePlayerCodeMutation";
import {
  CheckCodeIsFreeQuery,
  CheckCodeIsFreeQueryParams,
  CheckCodeIsFreeQueryResponse,
} from "./Queries/CheckCodeIsFree";
import {
  GetChannelsByProjectIDQuery,
  GetChannelsByProjectIDQueryParams,
  GetChannelsByProjectIDQueryResponse,
} from "./Queries/GetChannelsByProjectID";
import {
  GetChannelsForPlayerCodesQuery,
  GetChannelsForPlayerCodesQueryParams,
  GetChannelsForPlayerCodesQueryResponse,
} from "./Queries/GetChannelsForPlayerCodes";

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

  async getPlayersForPlayerCodes(
    projectId: string,
    playerCodeIDs: string[]
  ): Promise<GetChannelsForPlayerCodesQueryResponse> {
    this.logger.Debug("ID проекта: ", projectId);
    this.logger.Debug("ID кодов плееров в листинге: ", playerCodeIDs);

    try {
      const response = await this.client.Query<
        GetChannelsForPlayerCodesQueryParams,
        GetChannelsForPlayerCodesQueryResponse
      >(new GetChannelsForPlayerCodesQuery(projectId, playerCodeIDs), {});

      this.logger.Debug(
        "Ответ на запрос списка каналов для листинга кодов плеера: ",
        response
      );

      this.logger.Info(
        "Ответ на запрос списка каналов для листинга кодов плеера: ",
        response
      );

      return response;
    } catch (error) {
      this.logger.Error(
        "Ошибка запроса списка каналов для листинга кодов плеера: ",
        error
      );

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  async deactivatePlayerCode(code: string[]): Promise<boolean> {
    this.logger.Debug("Код плеера для деактивации: ", code);

    try {
      const { player_code_update } = await this.client.Mutation<
        DeactivatePlayerCodeMutationParams,
        DeactivatePlayerCodeMutationResponse
      >(new DeactivatePlayerCodeMutation(code), {});

      this.logger.Info(
        "Ответ на мутацию деактивации кода плеера: ",
        player_code_update
      );

      return player_code_update.affected_rows > 0;
    } catch (error) {
      this.logger.Error("Ошибка деактивации кода плеера: ", error);

      return false;
    }
  }
}
