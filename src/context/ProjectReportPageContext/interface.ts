import { TableRowType } from "./../../components/ProjectReports/types";
import {
  ReportTableHeaderCellType,
  ReportType,
} from "components/ProjectReports/types";
import { SortDirection } from "components/EditPageCustomFields/EditProjectPlaylist/FileList/List/ListHeader";

export interface ProjectReportPageContextTypes {
  dateFrom: Date;
  dateTo: Date;
  reportType: ReportType | undefined;
  selected: string[];
  tableHeaders: ReportTableHeaderCellType[];
  tableRows: TableRowType[];
  sortDirection: SortDirection;
  sortedColumnIndex: number | undefined;
  loadReportsList: boolean;
  loadReportsFile: boolean;
  errors: string | undefined;
}

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
  generateReport: () => void;

  /**
   * Записывает строки таблицы
   */
  setRows: (rows: TableRowType[]) => void;

  /**
   * Записывает направление сортировки таблицы
   */
  setSortDirection: (direction: SortDirection) => void;

  /**
   * Записывает индекс сортируемой колонки таблицы
   */
  setSortedColumnIndex: (index: number) => void;

  /**
   * Очистка ошибок
   */
  cleareError: VoidFunction;
}

export type ProjectReportPageContextCommonType<T = {}> = T &
  ProjectReportPageContextTypes &
  ProjectReportPageContextActionsTypes;
