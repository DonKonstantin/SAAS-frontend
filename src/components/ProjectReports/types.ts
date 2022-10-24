export type TabsTypes = "export" | "import";

export enum ReportType {
"playerLogs" = "playerLogs",
"files" = "files",
"deviceReport" = "deviceReport",
"capmaigns" = "capmaigns",
"channels" = "channels",
"reportRAO" = "reportRAO",
"reportVOIS" = "reportVOIS",
};

export interface ReportProps {
  dateFrom: Date;
  dateTo: Date;
}

export interface ReportTableHeaderCellType {
  title: string;
}