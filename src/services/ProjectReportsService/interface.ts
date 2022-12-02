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

export interface ProjectReportsServiceInterface {
  /**
   * Получаем отчет "Логи плеера" в формате .xlsx"
   */
  getReportPlayerLogs: (params: ReportPlayerLogsQueryParams) => Promise<Blob | undefined>;

  /**
   * Получаем отчет "Кампании" в формате .xlsx
   */
  getReportCampaign: (params: ReportCampaignQueryParams) => Promise<Blob | undefined>;

  /**
   * Получаем отчет "Каналы" в формате .xlsx
   */
  getReportChannels: (params: ReportChannelsQueryParams) => Promise<Blob | undefined>;

  /**
   * Получаем отчет "Отчет по устройству" в формате .xlsx
   */
  getReportDevice: (params: ReportDeviceQueryParams) => Promise<Blob | undefined>;

  /**
   * Получаем отчет "Файлы" в формате .xlsx
   */
  getReportFiles: (params: ReportFilesQueryParams) => Promise<Blob | undefined>;

  /**
   * Получаем отчет "РАО" в формате .xlsx
   */
  getReportRao: (params: ReportRaoQueryParams) => Promise<Blob | undefined>;

  /**
   * Получаем отчет "ВОИС" в формате .xlsx
   */
  getReportVoice: (params: ReportVoiceQueryParams) => Promise<Blob | undefined>;

  /**
   * Запрос списка доступных отчетов для 
   * "Отчета Логов плеера", 
   * "Отчет по устройству", 
   * "Отчет Кампании"
   * @param params
   */
  getPlayerPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<PlayerPlayInfoStatistic[]>;

  /**
   * Запрос списка доступных отчетов для "Отчет Каналы"
   * @param params
   */
  getChannelPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<ChannelPlayInfoStatistic[]>;

  /**
   * Запрос списка доступных отчетов для "Отчет Файлы" и "Отчет РАО" и "отчет ВОИС"
   * @param params
   */
  getFilePlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<(GlobalFilePlayInfoStatistic | ProjectFilePlayInfoStatistic)[]>;
}

export interface GetPlayerLogsReportParams {
  projectId: string;
  from: Date;
  to: Date;
}

export interface GetPlayerLogsReportResponse {

}
