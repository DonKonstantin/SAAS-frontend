import { Axios } from "axios";
import { getAuthorizationToken } from "context/AuthorizationContext";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ProjectReportsServiceInterface } from "./interface";
import {
  ChannelPlayInfoStatistic,
  GetPlayerPlayInfoStatisticResponse,
  PlayerPlayInfoStatistic,
  PlayInfoStatisticQueryParams,
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
  GetPlayerPlayInfoStatisticResponseDTOFactory,
} from "./Queryes/GetPlayerPlayInfoStatistic";
import {
   GetChannelPlayInfoStatistic,
  GetChannelPlayInfoStatisticResponse,
 } from "./Queryes/GetChannelPlayInfoStatistic";
import { GetFilesPlayInfoStatistic, GetFilesPlayInfoStatisticResponse } from "./Queryes/GetFilesPlayInfoStatistic";

/**
 * Сервис отчетов проекта
 */
export default class ProjectReportsService implements ProjectReportsServiceInterface {
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
  async getPlayerPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<PlayerPlayInfoStatistic[]> {
    this.logger.Debug("Параметры запроса: ", params);

    try {
      const response = await this.clientGQL.Query<PlayInfoStatisticQueryParams, GetPlayerPlayInfoStatisticResponse>(new GetPlayerPlayInfoStatistic(params), {});

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

  /**
   * Запрос списка доступных отчетов для "Отчет Файлы" и "Отчет РАО" и "отчет ВОИС"
   * @param params
   * @returns
   */
  async getFilePlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<GetFilesPlayInfoStatisticResponse> {
    this.logger.Debug("Параметры запроса: ", params);

    try {
      const response = await this.clientGQL.Query<PlayInfoStatisticQueryParams, GetFilesPlayInfoStatisticResponse>(new GetFilesPlayInfoStatistic(params), {});

      return response;
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }

  /**
   * Получаем отчет "Логи плеера" в формате .xlsx"
   * @param params
   * @returns
   */
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

    try {
      const file = await this.clientAxios.post<ReportPlayerLogsQueryParams, {data: Blob}>(`/reports/player-logs`, data, {
        responseType: "blob",
        headers,
      });

      this.logger.Debug("file loaded", file);

      return file.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Получаем отчет "Кампании" в формате .xlsx"
   * @param params
   * @returns
   */
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

    try {
      const file = await this.clientAxios.post<ReportCampaignQueryParams, {data: Blob}>(`/reports/campaign`, data, {
        responseType: "blob",
        headers,
      });

      this.logger.Debug("file loaded", file);

      return file.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Получаем отчет "Каналы" в формате .xlsx"
   * @param params
   * @returns
   */
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

    try {
      const file = await this.clientAxios.post<ReportChannelsQueryParams, {data: Blob}>(`/reports/channels`, data, {
        responseType: "blob",
        headers,
      });

      this.logger.Debug("file loaded", file);

      return file.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Получаем отчет "Отчет по устройству" в формате .xlsx"
   * @param params
   * @returns
   */
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

    try {
      const file = await this.clientAxios.post<ReportDeviceQueryParams, {data: Blob}>(`/reports/device`, data, {
        responseType: "blob",
        headers,
      });

      this.logger.Debug("file loaded", file);

      return file.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Получаем отчет "Файлы" в формате .xlsx"
   * @param params
   * @returns
   */
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

    try {
      const file = await this.clientAxios.post<ReportFilesQueryParams, {data: Blob}>(`/reports/files`, data, {
        responseType: "blob",
        headers,
      });

      this.logger.Debug("file loaded", file);

      return file.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Получаем отчет "РАО" в формате .xlsx"
   * @param params
   * @returns
   */
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

    try {
      const file = await this.clientAxios.post<ReportRaoQueryParams, {data: Blob}>(`/reports/rao`, data, {
        responseType: "blob",
        headers,
      });

      this.logger.Debug("file loaded", file);

      return file.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Получаем отчет "ВОИС" в формате .xlsx"
   * @param params
   * @returns
   */
  async getReportVoice(params: ReportVoiceQueryParams): Promise<Blob | undefined> {
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

    try {
      const file = await this.clientAxios.post<ReportVoiceQueryParams, {data: Blob}>(`/reports/voice`, data, {
        responseType: "blob",
        headers,
      });

      this.logger.Debug("file loaded", file);

      return file.data;
    } catch (e) {
      throw e;
    }
  }
}
