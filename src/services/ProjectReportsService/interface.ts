import { ReportType } from "components/ProjectReports/types";

export interface ProjectReportsServiceInterface {
  /**
   * Запрос листинга отчетов
   */
  getReportsList: (reportType: keyof ReportType, dateFrom: Date, dateTo: Date) => Promise<any>;
}