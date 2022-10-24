import { Axios, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { ReportType } from "components/ProjectReports/types";
import { getAuthorizationToken } from "context/AuthorizationContext";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { getQuery } from "./helpers";
import { ProjectReportsServiceInterface } from "./interface";
import { playerLogsResponse } from "./Mocks/playerLogs";

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
   */
  constructor(client: GraphQLClient, clientAxios: Axios) {
    this.clientAxios = clientAxios;
    this.clientGQL = client;
    this.logger = loggerFactory().make(`Project reports servic`);
  }

  /**
   * Запрос листинга отчетов
   * @param reportType
   * @param args
   */
  async getReportsList(reportType: keyof ReportType, ...args): Promise<any> {
    this.logger.Debug("Параметры запроса: ", args);
    this.logger.Debug("Тип отчета: ", reportType);

    try {
      const response = this.clientGQL.Query<any, any>(
        getQuery(reportType, ...args)!,
        {}
      );

      // return response;
      return playerLogsResponse;
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  async getReports(
    project: string,
    reportType: keyof ReportType,
    dateFrom: Date,
    dateTo: Date,
    primaryKeys: string[],
    config: AxiosRequestConfig = {}
  ): Promise<Blob | undefined> {
    this.logger.Debug("ID проекта: ", project);
    this.logger.Debug("Тип отчета: ", reportType);
    this.logger.Debug("Начиная с даты: ", dateFrom);
    this.logger.Debug("Заканчивая датой: ", dateTo);
    this.logger.Debug("Ключи выбранных отчетов: ", primaryKeys)

    this.logger.Info("config: ", config);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      "Authorization": token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      "from": dateFrom.toISOString(),
      "playerId": primaryKeys,
      "projectId": project,
      "to": dateTo.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, any>(
        `/reports/player-logs`,
        data,
        {
          responseType: "json",
          headers,
        }
      );
      //@ts-ignore
      this.logger.Info("file loaded", file.data);

      return file;
    } catch (e) {
      throw e;
    }
  }
}
