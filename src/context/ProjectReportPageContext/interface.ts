import { ReportType } from "components/ProjectReports/types";

export interface ProjectReportPageContextTypes {
  dateFrom: Date;
  dateTo: Date;
  reportType: keyof ReportType | undefined;
};

export interface ProjectReportPageContextActionsTypes {
  /**
   * Записываем начало периода для выбора отчетов
   */
  setDateFrom: (dateFrom: Date) => void;

  /**
   * Записываем конец периода для выбора отчетов
   */
   setDateTo: (dateTo: Date) => void;

   /**
    * Устанавливает тип отчета
    */
   setReportType: (reportType: keyof ReportType) => void;
};

export type ProjectReportPageContextCommonType<T = {}> = T & ProjectReportPageContextTypes & ProjectReportPageContextActionsTypes;