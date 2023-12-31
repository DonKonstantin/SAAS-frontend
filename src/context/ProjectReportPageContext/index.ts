import { TableRowType } from './../../components/ProjectReports/types';
import {
  ReportTableHeaderCellType,
  ReportType,
} from "components/ProjectReports/types";
import { getCurrentState } from "context/AuthorizationContext";
import { useEffect, useState } from "react";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  filter,
  map,
  merge,
  Observable,
  OperatorFunction,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { projectReportsService } from "services/ProjectReportsService";
import {
  ProjectReportPageContextActionsTypes,
  ProjectReportPageContextCommonType,
  ProjectReportPageContextTypes,
} from "./interface";
import {
  ChannelPlayInfoStatistic,
  GlobalFilePlayInfoStatistic,
  PlayerPlayInfoStatistic,
  PlayInfoStatistic,
  ProjectFilePlayInfoStatistic,
} from "../../services/ProjectReportsService/types";
import { campaignListService } from 'services/campaignListService';
import { Campaign } from 'services/campaignListService/types';
import { SortDirection } from 'components/EditPageCustomFields/EditProjectPlaylist/FileList/List/ListHeader';
import fileDownload from 'js-file-download';
import { GetFilesPlayInfoStatisticResponse } from 'services/ProjectReportsService/Queryes/GetFilesPlayInfoStatistic';

class DefaultContextData implements ProjectReportPageContextTypes {
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  reportType: undefined;
  selected: string[] = [];
  tableHeaders: ReportTableHeaderCellType[] = [];
  tableRows: TableRowType[] = [];
  sortDirection: SortDirection = "asc";
  sortedColumnIndex: number | undefined = undefined;
  loadReportsList: boolean = false;
  loadReportsFile: boolean = false;
  errors: string | undefined = undefined;
}

export type ReportItem =
  | GlobalFilePlayInfoStatistic
  | PlayerPlayInfoStatistic
  | ProjectFilePlayInfoStatistic
  | ChannelPlayInfoStatistic;

const context$ = new BehaviorSubject<ProjectReportPageContextTypes>(
  new DefaultContextData()
);

const dateFrom$ = new BehaviorSubject<Date>(new Date());
const dateTo$ = new BehaviorSubject<Date>(new Date());
const reportType$ = new BehaviorSubject<ReportType | undefined>(undefined);
const errors$ = new BehaviorSubject<string | undefined>(undefined);
const selected$ = new BehaviorSubject<string[]>([]);
const tableHeaders$ = new BehaviorSubject<ReportTableHeaderCellType[]>([]);
const tableRows$ = new BehaviorSubject<TableRowType[]>([]);
const sortDirection$ = new BehaviorSubject<SortDirection>("asc");
const sortedColumnIndex$ = new BehaviorSubject<number | undefined>(undefined);
const globalFiles$ = new BehaviorSubject<GlobalFilePlayInfoStatistic[]>([]);
const projectFiles$ = new BehaviorSubject<ProjectFilePlayInfoStatistic[]>([]);
const playerStatisticToCampaignBus$ = new BehaviorSubject<PlayerPlayInfoStatistic[]>([]);

const generateReport$ = new Subject<void>();

const LoadReportData$ = new BehaviorSubject<boolean>(false);
const LoadReportFile$ = new BehaviorSubject<boolean>(false);

/**
 * Шина записывает заголовок для таблицы со списком отчетов
 */
const tableHeaderBus$ = reportType$.pipe(
  filter(type => !!type),
  map((type: ReportType) => {
    switch (type) {
      case ReportType.playerLogs:
        return [
          {
            title: "reports.preview-table.logs.header.name",
            width: "80%",
          },
          {
            title: "reports.preview-table.logs.header.number-of-plays",
            width: "20%",
          },
        ];

      case ReportType.files:
        return [
          {
            title: "reports.preview-table.files.header.name",
            width: "80%",
          },
          {
            title: "reports.preview-table.files.header.number-of-plays",
            width: "20%",
          },
        ];

      case ReportType.deviceReport:
        return [
          {
            title: "reports.preview-table.device-report.header.name",
            width: "80%",
          },
          {
            title: "reports.preview-table.device-report.header.number-of-plays",
            width: "20%",
          },
        ];

      case ReportType.company:
        return [
          {
            title: "reports.preview-table.company.header.name",
            width: "60%",
          },
          {
            title: "reports.preview-table.company.header.status",
            width: "20%",
          },
          {
            title: "reports.preview-table.company.header.is-publication",
            width: "20%",
          },
        ];

      case ReportType.channels:
        return [
          {
            title: "reports.preview-table.channels.header.name",
            width: "80%",
          },
          {
            title: "reports.preview-table.channels.header.number-of-plays",
            width: "20%",
          },
        ];

      case ReportType.reportVOIS:
      case ReportType.reportRAO:
        return [
          {
            title: "reports.preview-table.report.header.name",
            width: "18%",
          },
          {
            title: "reports.preview-table.report.header.artist",
            width: "18%",
          },
          {
            title: "reports.preview-table.report.header.composer",
            width: "18%",
          },
          {
            title: "reports.preview-table.report.header.lyricist",
            width: "18%",
          },
          {
            title: "reports.preview-table.report.header.publisher",
            width: "18%",
          },
          {
            title: "reports.preview-table.report.header.number-of-plays",
            width: "10%",
          },
        ];
    }
  }),
  filter(data => !!data),
);

/**
 * Шина загрузки списка доступных вариантов для генерации отчета
 */
const loadReportsListBus$ = combineLatest([
  dateFrom$,
  dateTo$,
  reportType$,
]).pipe(
  map(([dateFrom, dateTo, reportType]) => ({
    dateFrom,
    dateTo,
    reportType,
  })),
  filter(({ reportType }) => !!reportType)
);

const loadPlayerStatistic$ = loadReportsListBus$.pipe(
  filter(({ reportType }) =>
    [
      ReportType.playerLogs,
      ReportType.deviceReport,
      ReportType.company,
    ].includes(reportType as ReportType)
  ),
  tap(() => LoadReportData$.next(true)),
  switchMap(({ dateFrom, dateTo }) => {
    const { project } = getCurrentState();

    return new Observable((subscriber) => {
      projectReportsService()
        .getPlayerPlayInfoStatistic({
          from: dateFrom.toISOString(),
          to: dateTo.toISOString(),
          projectId: project,
        })
        .then((value) => subscriber.next(value))
        .catch(() => subscriber.error("reports.error.load-list"));
    }).pipe(
      catchError(async (err) => errors$.next(err)),
    );
  })
);

const loadCampaignsBus$ = playerStatisticToCampaignBus$.pipe(
  filter(() => {
    const reportType = reportType$.getValue();

    if (reportType !== ReportType.company) {
      LoadReportData$.next(false);

      return false;
    }

    return reportType === ReportType.company;
  }),
  map((statistica: PlayerPlayInfoStatistic[]) => {
    const campaignsIds = statistica.flatMap(item => item.player.campaigns).map(campaign => campaign.campaignId);

    if (!campaignsIds.length) {
      LoadReportData$.next(false)

      return undefined;
    }

    return campaignsIds;
  }),
  filter(campaignsIds => !!campaignsIds),
  switchMap((campaignsIds: string[]) => {
    return new Observable((subscriber) => {
      campaignListService()
        .getCampaignsArrayByIds(campaignsIds)
        .then((value) => subscriber.next(value))
        .catch(() => subscriber.error("reports.error.load-list"));
    }).pipe(
      catchError(async (err) => {
        errors$.next(err);

        tableRows$.next([]);
      }),
    );
  })
);

const loadChanelStatistic$ = loadReportsListBus$.pipe(
  filter(({ reportType }) =>
    [ReportType.channels].includes(reportType as ReportType)
  ),
  tap(() => LoadReportData$.next(true)),
  switchMap(({ dateFrom, dateTo }) => {
    const { project } = getCurrentState();

    return new Observable((subscriber) => {
      projectReportsService()
        .getChannelPlayInfoStatistic({
          from: dateFrom.toISOString(),
          to: dateTo.toISOString(),
          projectId: project,
        })
        .then((value) => subscriber.next(value))
        .catch(() => subscriber.error("reports.error.load-list"));
    }).pipe(
      catchError(async (err) => errors$.next(err)),
    );
  })
);

const loadFileStatistic$ = loadReportsListBus$.pipe(
  filter(({ reportType }) =>
    [
      ReportType.files,
      ReportType.reportVOIS,
      ReportType.reportRAO,
    ].includes(reportType as ReportType)
  ),
  tap(() => LoadReportData$.next(true)),
  debounceTime(100),
  switchMap(({ dateFrom, dateTo }) => {
    const { project } = getCurrentState();

    return new Observable((subscriber) => {
      projectReportsService()
        .getFilePlayInfoStatistic({
          from: dateFrom.toISOString(),
          to: dateTo.toISOString(),
          projectId: project,
        })
        .then((value) => subscriber.next(value))
        .catch(() => subscriber.error("reports.error.load-list"));
    }).pipe(
      catchError(async (err) => errors$.next(err)),
    );
  }),
  tap((responce: GetFilesPlayInfoStatisticResponse) => globalFiles$.next(responce.globalFiles)),
  tap((responce: GetFilesPlayInfoStatisticResponse) => projectFiles$.next(responce.projectFiles)),
  map(({ globalFiles, projectFiles }) => [...globalFiles, ...projectFiles]),
);

/**
 * Шина загрузки отчетов
 */
const generateReportsBus$ = generateReport$.pipe(
  map(() => {
    const dateFrom = dateFrom$.getValue();
    const dateTo = dateTo$.getValue();
    const reportType = reportType$.getValue();
    const { project } = getCurrentState();
    const reportsIds = selected$.getValue();

    return {
      dateFrom,
      dateTo,
      reportType,
      project,
      reportsIds,
    };
  }),
  filter(({ reportType, reportsIds }) => !!reportType && !!reportsIds.length),
  tap(() => LoadReportFile$.next(true)),
);

/**
 * Шина загрузки отчета "Логи плеера"
 */
const getReportPlayerLogsBus$ = generateReportsBus$.pipe(
  filter(({ reportType }) => reportType === ReportType.playerLogs),
  switchMap(async ({ dateFrom, dateTo, project, reportsIds }) => {
    try {
      return await projectReportsService().getReportPlayerLogs({
        from: dateFrom,
        to: dateTo,
        playerId: reportsIds,
        projectId: project,
      });
    } catch (_) {
      errors$.next("reports.error.load-report");

      LoadReportFile$.next(false);
    }
  }),
);

/**
 * Шина загрузки отчета "Кампании"
 */
const getReportCampaignBus$ = generateReportsBus$.pipe(
  filter(({ reportType }) => reportType === ReportType.company),
  switchMap(async ({ dateFrom, dateTo, project, reportsIds }) => {
    try {
      return await projectReportsService().getReportCampaign({
        from: dateFrom,
        to: dateTo,
        campaignId: reportsIds,
        projectId: project,
      });
    } catch (_) {
      errors$.next("reports.error.load-report");

      LoadReportFile$.next(false);
    }
  }),
);

/**
 * Шина загрузки отчета "Каналы"
 */
 const getReportChannelsBus$ = generateReportsBus$.pipe(
  filter(({ reportType }) => reportType === ReportType.channels),
  switchMap(async ({ dateFrom, dateTo, project, reportsIds }) => {
    try {
      return await projectReportsService().getReportChannels({
        from: dateFrom,
        to: dateTo,
        channelId: reportsIds,
        projectId: project,
      });
    } catch (_) {
      errors$.next("reports.error.load-report");

      LoadReportFile$.next(false);
    }
  }),
);

/**
 * Шина загрузки отчета "Отчет по устройству"
 */
 const getReportDeviceBus$ = generateReportsBus$.pipe(
  filter(({ reportType }) => reportType === ReportType.deviceReport),
  switchMap(async ({ dateFrom, dateTo, project, reportsIds }) => {
    try {
      return await projectReportsService().getReportDevice({
        from: dateFrom,
        to: dateTo,
        playerId: reportsIds,
        projectId: project,
      });
    } catch (_) {
      errors$.next("reports.error.load-report");

      LoadReportFile$.next(false);
    }
  }),
);

/**
 * Шина загрузки отчета "Файлы"
 */
 const getReportFilesBus$ = generateReportsBus$.pipe(
  filter(({ reportType }) => reportType === ReportType.files),
  switchMap(async ({ dateFrom, dateTo, project, reportsIds }) => {
    const globalFiles = globalFiles$.getValue();
    const projectFiles = projectFiles$.getValue();

    const selectedGlobalFiles = globalFiles
      .filter(file => reportsIds.some(id => id === file.id))
      .map(item => item.id);
    const selectedProjectFiles = projectFiles
      .filter(file => reportsIds.some(id => id === file.id))
      .map(item => item.id);

    try {
      return await projectReportsService().getReportFiles({
        from: dateFrom,
        to: dateTo,
        globalFileId: selectedGlobalFiles,
        projectFileId: selectedProjectFiles,
        projectId: project,
      });
    } catch (_) {
      errors$.next("reports.error.load-report");

      LoadReportFile$.next(false);
    }
  }),
);

/**
 * Шина загрузки отчета "РАО"
 */
 const getReportRaoBus$ = generateReportsBus$.pipe(
  filter(({ reportType }) => reportType === ReportType.reportRAO),
  switchMap(async ({ dateFrom, dateTo, project, reportsIds }) => {
    try {
      return await projectReportsService().getReportRao({
        from: dateFrom,
        to: dateTo,
        playerId: reportsIds,
        projectId: project,
      });
    } catch (_) {
      errors$.next("reports.error.load-report");

      LoadReportFile$.next(false);
    }
  }),
);

/**
 * Шина загрузки отчета "ВОИС"
 */
 const getReportVoice$ = generateReportsBus$.pipe(
  filter(({ reportType }) => reportType === ReportType.reportVOIS),
  switchMap(async ({ dateFrom, dateTo, project, reportsIds }) => {
    try {
      return await projectReportsService().getReportVoice({
        from: dateFrom,
        to: dateTo,
        playerId: reportsIds,
        projectId: project,
      });
    } catch (_) {
      errors$.next("reports.error.load-report");

      LoadReportFile$.next(false);
    }
  }),
);

const downloadReportFileBus$ = merge(
  getReportPlayerLogsBus$,
  getReportCampaignBus$,
  getReportChannelsBus$,
  getReportDeviceBus$,
  getReportFilesBus$,
  getReportRaoBus$,
  getReportVoice$,
).pipe(
  filter(blob => !!blob),
  tap(() => LoadReportFile$.next(false)),
);

const collectBus$: Observable<
  Pick<
    ProjectReportPageContextTypes, 
    "dateFrom" 
    | "dateTo"
    | "reportType"
    | "selected"
    | "tableHeaders"
    | "tableRows"
    | "sortDirection"
    | "sortedColumnIndex"
    | "loadReportsList"
    | "loadReportsFile"
    | "errors"
  >
> = combineLatest([
  dateFrom$,
  dateTo$,
  reportType$,
  selected$,
  tableHeaders$,
  tableRows$,
  sortDirection$,
  sortedColumnIndex$,
  LoadReportData$,
  LoadReportFile$,
  errors$,
]).pipe(
  map(([
    dateFrom, 
    dateTo, 
    reportType,
    selected, 
    tableHeaders, 
    tableRows, 
    sortDirection,
    sortedColumnIndex,
    loadReportsList,
    loadReportsFile,
    errors,
  ]) => ({
    dateFrom,
    dateTo,
    reportType,
    selected,
    tableHeaders,
    tableRows,
    sortDirection,
    sortedColumnIndex,
    loadReportsList,
    loadReportsFile,
    errors,
  }))
);

export const InitProjectReportPageContextContext = () => {
  const subscriber = collectBus$.subscribe({
    next: (value) => {
      context$.next({
        ...context$.getValue(),
        ...value,
      });
    },
  });

  subscriber.add(loadReportsListBus$.subscribe());

  subscriber.add(downloadReportFileBus$.subscribe((file: Blob) => {
    fileDownload(file, 'report.xlsx');
  }));
  
  subscriber.add(loadPlayerStatistic$.subscribe((response: PlayerPlayInfoStatistic[]) => {
    playerStatisticToCampaignBus$.next(response);

    const reportType = reportType$.getValue();

    let tableData: TableRowType[] = [];

    if (!reportType$) {
      return
    }

    switch (reportType) {
      case ReportType.playerLogs:
        tableData = response.map(item => {
          return {
            primaryKey: item.id, 
            cells: [item.name, item.played],
          }
        });
        
        break;

      case ReportType.deviceReport:
        tableData = response.map(item => {
          return {
            primaryKey: item.id, 
            cells: [item.name, item.played],
          }
        });
        
        break;
      
    
      default:
        tableData = response.map(item => {
          return {
            primaryKey: item.id, 
            cells: [item.name],
          }
        });

        break;
    }
        
    tableRows$.next(tableData);

    if (reportType === ReportType.company) {
      return
    }

    LoadReportData$.next(false);
  }));

  subscriber.add(loadCampaignsBus$.subscribe((response: Campaign[]) => {
    const tableRows = tableRows$.getValue();

    const extendedRows = tableRows.map(row => {
      const campaign = response.find(campaign => campaign.id === row.primaryKey);

      const statuses = campaign?.channels.map(channel => channel.channel.is_active) || [false];

      const isPublished = statuses.some(s => !!s);

      const start = new Date(campaign?.campaign_period_start || "").getTime();
      const end = new Date(campaign?.campaign_period_stop || "").getTime();
      const today = new Date().getTime();

      const isInPeriod = start - today < 0 && end - today > 0;

      return {
        ...row,
        cells: [row.cells[0], isInPeriod && isPublished, `reports.preview-table.company.value.is-publication.${isPublished}`],
      }
    });

    tableRows$.next(extendedRows);

    LoadReportData$.next(false);
  }));

  subscriber.add(loadChanelStatistic$.subscribe((response: ChannelPlayInfoStatistic[]) => {
    tableRows$.next(response.map(chennal => ({
      primaryKey: chennal.id,
      cells: [chennal.name, chennal.played],
    })));

    LoadReportData$.next(false);
  }));

  subscriber.add(loadFileStatistic$.subscribe((response: (PlayInfoStatistic | GlobalFilePlayInfoStatistic)[]) => {
    const reportType = reportType$.getValue();

    let tableData: TableRowType[] = [];

    switch (reportType) {
      case ReportType.files:
        tableData = response.map(res => ({
          primaryKey: res.id,
          cells: [res.name, res.played]
        }));

        break;
    
      default:
        tableData = response.map((res: GlobalFilePlayInfoStatistic) => {
          const file = res.file;

          return {
            primaryKey: res.id,
            cells: [res.name, file.artist || "", file.composer, file.lyricist || "", file.publisher || "", res.played],
          }
        });

        break;
    }

    tableRows$.next(tableData);

    LoadReportData$.next(false);
  }));

  subscriber.add(tableHeaderBus$.subscribe(tableHeaders$));

  return () => subscriber.unsubscribe();
};

/**
 * Записываем начало периода для выбора отчетов
 * @param dateFrom
 */
const setDateFrom: ProjectReportPageContextActionsTypes["setDateFrom"] = (
  dateFrom
) => {
  dateFrom$.next(dateFrom);
};

/**
 * Записываем конец периода для выбора отчетов
 * @param dateTo
 */
const setDateTo: ProjectReportPageContextActionsTypes["setDateTo"] = (
  dateTo
) => {
  dateTo$.next(dateTo);
};

/**
 * Устанавливает тип отчета
 * @param reportType
 */
const setReportType: ProjectReportPageContextActionsTypes["setReportType"] = (
  reportType
) => {
  reportType$.next(reportType);

  selected$.next([]);

  sortDirection$.next("asc");

  sortedColumnIndex$.next(undefined);
};

/**
 * Записывает выбранные строки
 * @param selected
 */
const setSelected: ProjectReportPageContextActionsTypes["setSelected"] = (
  selected
) => {
  selected$.next(selected);
};

/**
 * Сгенерировать отчет
 */
const generateReport: ProjectReportPageContextActionsTypes["generateReport"] = () => {
  generateReport$.next();
};

/**
 * Записывает строки таблицы
 * @param rows 
 */
const setRows: ProjectReportPageContextActionsTypes["setRows"] = (
  rows
) => {
  tableRows$.next(rows);
};

/**
 * Записывает направление сортировки таблицы
 * @param direction 
 */
 const setSortDirection: ProjectReportPageContextActionsTypes["setSortDirection"] = (
  direction
) => {
  sortDirection$.next(direction);
};

/**
 * Записывает индекс сортируемой колонки таблицы
 * @param index 
 */
 const setSortedColumnIndex: ProjectReportPageContextActionsTypes["setSortedColumnIndex"] = (
  index
) => {
  sortedColumnIndex$.next(index);
};

/**
 * Очистка ошибок
 */
 const cleareError: ProjectReportPageContextActionsTypes["cleareError"] = () => {
  errors$.next(undefined);
};

const actions: ProjectReportPageContextActionsTypes = {
  setDateFrom,
  setDateTo,
  setReportType,
  setSelected,
  generateReport,
  setRows,
  setSortDirection,
  setSortedColumnIndex,
  cleareError,
};

/**
 * хук жоступа к контексту
 * @param pipeModificators
 * @returns
 */
export const useProjectReportPageContext = (
  ...pipeModificators: OperatorFunction<ProjectReportPageContextTypes, any>[]
): ProjectReportPageContextCommonType => {
  const [contextData, setContextData] = useState<ProjectReportPageContextTypes>(
    context$.getValue()
  );

  useEffect(() => {
    const subscription = context$
      //@ts-ignore
      .pipe(...pipeModificators)
      .subscribe({
        next: (data) => setContextData(data),
      });

    return () => subscription.unsubscribe();
  });

  return {
    ...actions,
    ...contextData,
  };
};
