import { Axios, AxiosRequestConfig } from "axios";
import { ReportType } from "components/ProjectReports/types";
import { getAuthorizationToken } from "context/AuthorizationContext";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ProjectReportsServiceInterface } from "./interface";
import {
  ChannelPlayInfoStatistic,
  GetPlayerPlayInfoStatisticResponse,
  GlobalFilePlayInfoStatistic,
  PlayerPlayInfoStatistic,
  PlayInfoStatisticQueryParams,
  ProjectFilePlayInfoStatistic,
} from "./types";
import {
  GetPlayerPlayInfoStatistic,
  GetPlayerPlayInfoStatisticResponseDTOFactory,
} from "./Queryes/GetPlayerPlayInfoStatistic";
import {
  GetChannelPlayInfoStatistic,
  GetChannelPlayInfoStatisticResponse,
} from "./Queryes/GetChannelPlayInfoStatistic";
import {
  GetFilesPlayInfoStatistic,
  GetFilesPlayInfoStatisticResponse,
} from "./Queryes/GetFilesPlayInfoStatistic";

/**
 * Сервис отчетов проекта
 */
export default class ProjectReportsService
  implements ProjectReportsServiceInterface
{
  //  Клиент GraphQL API
  private readonly clientGQL: GraphQLClient;

  //  Клиент Axios
  private readonly clientAxios: Axios;

  //  Логгер
  private readonly logger: Logger;

  /**
   * Конструктор сервиса
   * @param client
   * @param clientAxios
   */
  constructor(client: GraphQLClient, clientAxios: Axios) {
    this.clientAxios = clientAxios;
    this.clientGQL = client;
    this.logger = loggerFactory().make(`Project reports service`);
  }

  /**
   * Запрос списка доступных отчетов для
   * "Логов плеера",
   * "Отчет по устройству",
   * "Отчет Кампании"
   * @param params
   * @returns
   */
  async getPlayerPlayInfoStatistic(
    params: PlayInfoStatisticQueryParams
  ): Promise<PlayerPlayInfoStatistic[]> {
    this.logger.Debug("Параметры запроса: ", params);

    try {
      const response = await this.clientGQL.Query<
        PlayInfoStatisticQueryParams,
        GetPlayerPlayInfoStatisticResponse
      >(new GetPlayerPlayInfoStatistic(params), {});

      return GetPlayerPlayInfoStatisticResponseDTOFactory(response.logs);
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Запрос списка доступных отчетов для "Отчет Каналы"
   * @param params
   * @returns
   */
  async getChannelPlayInfoStatistic(
    params: PlayInfoStatisticQueryParams
  ): Promise<ChannelPlayInfoStatistic[]> {
    this.logger.Debug("Параметры запроса: ", params);

    try {
      const response = await this.clientGQL.Query<
        PlayInfoStatisticQueryParams,
        GetChannelPlayInfoStatisticResponse
      >(new GetChannelPlayInfoStatistic(params), {});

      return response.logs;
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Запрос списка доступных отчетов для "Отчет Файлы" и "Отчет РАО" и "отчет ВОИС"
   * @param params
   * @returns
   */
  async getFilePlayInfoStatistic(
    params: PlayInfoStatisticQueryParams
  ): Promise<(GlobalFilePlayInfoStatistic | ProjectFilePlayInfoStatistic)[]> {
    this.logger.Debug("Параметры запроса: ", params);

    try {
      const response = await this.clientGQL.Query<
        PlayInfoStatisticQueryParams,
        GetFilesPlayInfoStatisticResponse
      >(new GetFilesPlayInfoStatistic(params), {});

      return [...response.globalFiles, ...response.projectFiles];
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Запрос отчета
   * @param project
   * @param reportType
   * @param dateFrom
   * @param dateTo
   * @param primaryKeys
   * @param config
   * @returns
   */
  async getReports(
    project: string,
    reportType: ReportType,
    dateFrom: Date,
    dateTo: Date,
    primaryKeys: string[],
    config: AxiosRequestConfig = {}
  ): Promise<Blob | undefined> {
    this.logger.Debug("ID проекта: ", project);
    this.logger.Debug("Тип отчета: ", reportType);
    this.logger.Debug("Начиная с даты: ", dateFrom);
    this.logger.Debug("Заканчивая датой: ", dateTo);
    this.logger.Debug("Ключи выбранных отчетов: ", primaryKeys);

    this.logger.Debug("config: ", config);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      from: dateFrom.toISOString(),
      playerId: primaryKeys,
      projectId: project,
      to: dateTo.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, Blob>(
        `/reports/player-logs`,
        data,
        {
          responseType: "blob",
          headers,
        }
      );

      this.logger.Info("file loaded", file);

      return new Blob([file]);
    } catch (e) {
      throw e;
    }
  }
}
