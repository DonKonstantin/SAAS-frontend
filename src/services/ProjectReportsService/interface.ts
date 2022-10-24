import { ReportType } from "components/ProjectReports/types";

export interface ProjectReportsServiceInterface {
  /**
   * Запрос листинга отчетов
   */
  getReportsList: (reportType: keyof ReportType, project: string, dateFrom: Date, dateTo: Date) => Promise<any>;

  /**
   * Запрос отчета
   */
  getReports: (project: string, reportType: keyof ReportType, dateFrom: Date, dateTo: Date, primaryKeys: string[]) => Promise<Blob | undefined>;
}

export interface GetPlayerLogsReportParams {
  projectId: string;
  from: Date;
  to: Date;
}

export interface GetPlayerLogsReportResponse {

}