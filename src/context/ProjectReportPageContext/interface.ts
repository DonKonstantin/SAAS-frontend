import { ReportType } from "components/ProjectReports/types";

export interface ProjectReportPageContextTypes {
  dateFrom: Date;
  dateTo: Date;
  reportType: ReportType | undefined;
  selected: string[];
  reportsList: any[];
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
   setReportType: (reportType: ReportType) => void;

   /**
    * Записывает выбранные строки
    */
   setSelected: (selected: any[]) => void;

   /**
    * Сгенерировать отчет
    */
   generateReport: (reportsIds: string[]) => void;
};

export type ProjectReportPageContextCommonType<T = {}> = T & ProjectReportPageContextTypes & ProjectReportPageContextActionsTypes;