import { ReportType } from "components/ProjectReports/types";
import React, { FC, memo } from "react";
import Capmaigns from "./Capmaigns";
import Channels from "./Channels";
import DeviceReport from "./DeviceReport";
import Files from "./Files";
import PlayerLogs from "./PlayerLogs";
import ReportRAO from "./ReportRAO";

interface Props {
  reportType: keyof ReportType | undefined;
  dateFrom: Date;
  dateTo: Date;
};

/**
 * Фабрика выведения страницы выбранного отчета
 * @param props 
 * @returns 
 */
const Reports: FC<Props> = props => {
  const { reportType, ...otherProps } = props;

  switch (reportType) {
    case ReportType.playerLogs:
      return <PlayerLogs {...otherProps}/>;

    case ReportType.files:
      return <Files {...otherProps}/>;

    case ReportType.deviceReport:
      return <DeviceReport {...otherProps}/>;

    case ReportType.company:
      return <Capmaigns {...otherProps}/>;

    case ReportType.channels:
      return <Channels {...otherProps}/>;

    case ReportType.reportRAO:
      return <ReportRAO {...otherProps}/>;

    case ReportType.reportVOIS:
      return <PlayerLogs {...otherProps}/>;

    default:
      return null;
  }
};

export default memo(Reports);
