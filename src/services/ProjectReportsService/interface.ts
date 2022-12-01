import { ReportType } from "components/ProjectReports/types";
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
   * Запрос листинга отчетов
   */
  getReportsList: (reportType: keyof ReportType, project: string, dateFrom: Date, dateTo: Date) => Promise<any>;

  /**
   * Запрос отчета "Логи плеера"
   */
  getReportPlayerLogs: (params: ReportPlayerLogsQueryParams) => Promise<Blob | undefined>;

  /**
   * Запрос отчета "Кампании"
   */
  getReportCampaign: (params: ReportCampaignQueryParams) => Promise<Blob | undefined>;

  /**
   * Запрос отчета "Каналы"
   */
  getReportChannels: (params: ReportChannelsQueryParams) => Promise<Blob | undefined>;

  /**
   * Запрос отчета "Отчет по устройству"
   */
  getReportDevice: (params: ReportDeviceQueryParams) => Promise<Blob | undefined>;

  /**
   * Запрос отчета "Файлы"
   */
  getReportFiles: (params: ReportFilesQueryParams) => Promise<Blob | undefined>;

  /**
   * Запрос отчета "РАО"
   */
  getReportRao: (params: ReportRaoQueryParams) => Promise<Blob | undefined>;

  /**
   * Запрос отчета "ВОИС"
   */
  getReportVoice: (params: ReportVoiceQueryParams) => Promise<Blob | undefined>;

  getPlayerPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<PlayerPlayInfoStatistic[]>;

  getChannelPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<ChannelPlayInfoStatistic[]>;

  getFilePlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<(GlobalFilePlayInfoStatistic | ProjectFilePlayInfoStatistic)[]>;
}

export interface GetPlayerLogsReportParams {
  projectId: string;
  from: Date;
  to: Date;
}

export interface GetPlayerLogsReportResponse {

}
