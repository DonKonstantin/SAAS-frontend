import { Axios } from "axios";
import { ReportType } from "components/ProjectReports/types";
import { getAuthorizationToken } from "context/AuthorizationContext";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ProjectReportsServiceInterface } from "./interface";
import { playerLogsResponse } from "./Mocks/playerLogs";
import {
  ChannelPlayInfoStatistic,
  GlobalFilePlayInfoStatistic,
  PlayerPlayInfoStatistic,
  PlayInfoStatisticQueryParams,
  ProjectFilePlayInfoStatistic,
  ReportCampaignQueryParams,
  ReportChannelsQueryParams,
  ReportDeviceQueryParams,
  ReportFilesQueryParams,
  ReportPlayerLogsQueryParams,
  ReportRaoQueryParams,
  ReportVoiceQueryParams,
} from "./types";
import {
  GetPlayerPlayInfoStatistic,
  GetPlayerPlayInfoStatisticResponse,
  GetPlayerPlayInfoStatisticResponseDTOFactory
} from "./Queryes/GetPlayerPlayInfoStatistic";
import {GetChannelPlayInfoStatistic, GetChannelPlayInfoStatisticResponse} from "./Queryes/GetChannelPlayInfoStatistic";
import {
  GetFilesPlayInfoStatistic,
  GetFilesPlayInfoStatisticResponse,
} from "./Queryes/GetFilesPlayInfoStatistic";


/**
 * Сервис отчетов проекта
 */
export default class ProjectReportsService  implements ProjectReportsServiceInterface {
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
   * Запрос листинга отчетов
   * @param reportType
   * @param args
   */
  async getReportsList(reportType: keyof ReportType, ...args): Promise<any> {
    this.logger.Debug("Параметры запроса: ", args);
    this.logger.Debug("Тип отчета: ", reportType);

    try {
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

  async getPlayerPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<PlayerPlayInfoStatistic[]> {
    this.logger.Debug("Параметры запроса: ", params);

    try {
      const response = await this.clientGQL.Query<PlayInfoStatisticQueryParams, GetPlayerPlayInfoStatisticResponse>(
          new GetPlayerPlayInfoStatistic(params),
          {}
      );

      return GetPlayerPlayInfoStatisticResponseDTOFactory(response.logs);
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  async getChannelPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<ChannelPlayInfoStatistic[]> {
    this.logger.Debug("Параметры запроса: ", params);

    try {
      const response = await this.clientGQL.Query<PlayInfoStatisticQueryParams, GetChannelPlayInfoStatisticResponse>(
          new GetChannelPlayInfoStatistic(params),
          {}
      );

      return response.logs;
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }


  async getFilePlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<(GlobalFilePlayInfoStatistic | ProjectFilePlayInfoStatistic)[]> {
    this.logger.Debug("Параметры запроса: ", params);

    try {
      const response = await this.clientGQL.Query<PlayInfoStatisticQueryParams, GetFilesPlayInfoStatisticResponse>(
          new GetFilesPlayInfoStatistic(params),
          {}
      );

      return [
        ...response.globalFiles,
        ...response.projectFiles,
      ];
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  async getReportPlayerLogs(params: ReportPlayerLogsQueryParams): Promise<Blob | undefined> {
    this.logger.Debug("Параметры запроса: ", params);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      ...params,
      from: params.from.toISOString(),
      to: params.to.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, any>(`/reports/player-logs`, data, {
        responseType: "json",
        headers,
      });
      //@ts-ignore
      this.logger.Info("file loaded", file.data);

      return file;
    } catch (e) {
      throw e;
    }
  }

  async getReportCampaign(params: ReportCampaignQueryParams): Promise<Blob | undefined> {
    this.logger.Debug("Параметры запроса: ", params);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      ...params,
      from: params.from.toISOString(),
      to: params.to.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, any>(`/reports/campaign`, data, {
        responseType: "json",
        headers,
      });
      //@ts-ignore
      this.logger.Info("file loaded", file.data);

      return file;
    } catch (e) {
      throw e;
    }
  }

  async getReportChannels(params: ReportChannelsQueryParams): Promise<Blob | undefined> {
    this.logger.Debug("Параметры запроса: ", params);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      ...params,
      from: params.from.toISOString(),
      to: params.to.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, any>(`/reports/channels`, data, {
        responseType: "json",
        headers,
      });
      //@ts-ignore
      this.logger.Info("file loaded", file.data);

      return file;
    } catch (e) {
      throw e;
    }
  }

  async getReportDevice(params: ReportDeviceQueryParams): Promise<Blob | undefined> {
    this.logger.Debug("Параметры запроса: ", params);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      ...params,
      from: params.from.toISOString(),
      to: params.to.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, any>(`/reports/device`, data, {
        responseType: "json",
        headers,
      });
      //@ts-ignore
      this.logger.Info("file loaded", file.data);

      return file;
    } catch (e) {
      throw e;
    }
  }

  async getReportFiles(params: ReportFilesQueryParams): Promise<Blob | undefined> {
    this.logger.Debug("Параметры запроса: ", params);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      ...params,
      from: params.from.toISOString(),
      to: params.to.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, any>(`/reports/files`, data, {
        responseType: "json",
        headers,
      });
      //@ts-ignore
      this.logger.Info("file loaded", file.data);

      return file;
    } catch (e) {
      throw e;
    }
  }

  async getReportRao(params: ReportRaoQueryParams): Promise<Blob | undefined> {
    this.logger.Debug("Параметры запроса: ", params);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      ...params,
      from: params.from.toISOString(),
      to: params.to.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, any>(`/reports/rao`, data, {
        responseType: "json",
        headers,
      });
      //@ts-ignore
      this.logger.Info("file loaded", file.data);

      return file;
    } catch (e) {
      throw e;
    }
  }

  async getReportVoice(params: ReportVoiceQueryParams): Promise<Blob | undefined> {
    this.logger.Debug("Параметры запроса: ", params);

    let token: string = getAuthorizationToken();

    if (!token || 0 === token.length) {
      return undefined;
    }

    const headers = {
      "Authorization": token,
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      ...params,
      from: params.from.toISOString(),
      to: params.to.toISOString(),
    });

    this.logger.Info("data: ", data);

    try {
      const file = await this.clientAxios.post<any, any>(`/reports/voice`, data, {
        responseType: "json",
        headers,
      });
      //@ts-ignore
      this.logger.Info("file loaded", file.data);

      return file;
    } catch (e) {
      throw e;
    }
  }
}
