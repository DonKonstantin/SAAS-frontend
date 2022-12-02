import { ReportType } from "components/ProjectReports/types";
import {
  ChannelPlayInfoStatistic,
  GlobalFilePlayInfoStatistic,
  PlayerPlayInfoStatistic,
  PlayInfoStatisticQueryParams, ProjectFilePlayInfoStatistic
} from "./types";

export interface ProjectReportsServiceInterface {

  /**
   * Запрос отчета
   */
  getReports: (project: string, reportType: ReportType, dateFrom: Date, dateTo: Date, primaryKeys: string[]) => Promise<Blob | undefined>;

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