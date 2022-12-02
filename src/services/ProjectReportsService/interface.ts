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

  getPlayerPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<PlayerPlayInfoStatistic[]>;

  getChannelPlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<ChannelPlayInfoStatistic[]>;

  getFilePlayInfoStatistic(params: PlayInfoStatisticQueryParams): Promise<(GlobalFilePlayInfoStatistic | ProjectFilePlayInfoStatistic)[]>;
}

export interface GetPlayerLogsReportParams {
  projectId: string;
  from: Date;
  to: Date;
}

export interface GetPlayerLogsReportResponse {}
