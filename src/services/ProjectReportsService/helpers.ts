import { ReportType } from "components/ProjectReports/types";
import { GetCampaignsReport } from "./Queryes/GetCampaignsReport";
import { GetChannelsReport } from "./Queryes/GetChannelsReport";
import { GetDeviceReport } from "./Queryes/GetDeviceReport";
import { GetFilesReport } from "./Queryes/GetFilesReport";
import { GetPlayerLogsReport } from "./Queryes/GetPlayerLogsReport";
import { GetRAOReport } from "./Queryes/GetRAOReport";
import { GetVOISReport } from "./Queryes/GetVOISReport";

export const getQuery = (reportType: keyof ReportType, ...args: any[]) => {
  let query;

  switch (reportType) {
    case ReportType.capmaigns: 
      query = GetCampaignsReport;
      break;

    case ReportType.channels: 
      query = GetChannelsReport;
      break;

    case ReportType.deviceReport: 
      query = GetDeviceReport;
      break;

    case ReportType.files: 
      query = GetFilesReport;
      break;

    case ReportType.playerLogs: 
      query = GetPlayerLogsReport;
      break;

    case ReportType.reportRAO: 
      query = GetRAOReport;
      break;

    case ReportType.reportVOIS: 
      query = GetVOISReport;
      break;
  };

  return new query(...args);
}