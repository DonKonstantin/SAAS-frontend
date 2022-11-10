import { ReportType } from "components/ProjectReports/types";
import {
  ChannelPlayInfoStatistic,
  GlobalFilePlayInfoStatistic,
  PlayerPlayInfoStatistic,
  PlayInfoStatisticQueryParams, ProjectFilePlayInfoStatistic
} from "./types";

export interface ProjectReportsServiceInterface {
  /**
   * Запрос листинга отчетов
   */
  getReportsList: (reportType: keyof ReportType, project: string, dateFrom: Date, dateTo: Date) => Promise<any>;

  /**
   * Запрос отчета
   */
  getReports: (project: string, reportType: ReportType, dateFrom: Date, dateTo: Date, primaryKeys: string[]) => Promise<Blob | undefined>;


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