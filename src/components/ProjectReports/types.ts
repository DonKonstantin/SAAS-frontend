export type TabsTypes = "export" | "import";

export enum ReportType {
  "playerLogs" = "playerLogs",
  "files" = "files",
  "deviceReport" = "deviceReport",
  "company" = "company",
  "channels" = "channels",
  "reportRAO" = "reportRAO",
  "reportVOIS" = "reportVOIS",
}

export interface ReportProps {
  dateFrom: Date;
  dateTo: Date;
}

export interface ReportTableHeaderCellType {
  title: string;
  width: string;
}

export interface TableRowType {
  primaryKey: string;
  cells: any[];
}
