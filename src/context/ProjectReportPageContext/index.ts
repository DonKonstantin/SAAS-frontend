import {ReportType} from "components/ProjectReports/types";
import {getCurrentState} from "context/AuthorizationContext";
import {useEffect, useState} from "react";
import {
    BehaviorSubject, catchError,
    combineLatest,
    combineLatestWith, distinctUntilChanged, distinctUntilKeyChanged,
    filter,
    finalize,
    map,
    merge,
    Observable,
    OperatorFunction,
    Subject,
    switchMap, tap,
} from "rxjs";
import {projectReportsService} from "services/ProjectReportsService";
import {
    ProjectReportPageContextActionsTypes,
    ProjectReportPageContextCommonType,
    ProjectReportPageContextTypes,
} from "./interface";
import {
    ChannelPlayInfoStatistic,
    GlobalFilePlayInfoStatistic,
    PlayerPlayInfoStatistic, PlayInfoStatisticQueryParams,
    ProjectFilePlayInfoStatistic
} from "../../services/ProjectReportsService/types";

class DefaultContextData implements ProjectReportPageContextTypes {
    dateFrom: Date = new Date();
    dateTo: Date = new Date();
    reportType: undefined;
    selected: string[] = [];
    reportsList: ReportItem[] = [];
}

export type ReportItem =
    GlobalFilePlayInfoStatistic
    | PlayerPlayInfoStatistic
    | ProjectFilePlayInfoStatistic
    | ChannelPlayInfoStatistic

const context$ = new BehaviorSubject<ProjectReportPageContextTypes>(
    new DefaultContextData()
);

const dateFrom$ = new BehaviorSubject<Date>(new Date());
const dateTo$ = new BehaviorSubject<Date>(new Date());
const reportType$ = new BehaviorSubject<ReportType | undefined>(undefined);
const reportsList$ = new BehaviorSubject<any>([]);
const errors$ = new BehaviorSubject<any>({});
const selected$ = new BehaviorSubject<string[]>([]);
const reportsIds$ = new Subject<string[]>();

const LoadReportData$ = new Subject();

/**
 * Шина загрузки списка доступных вариантов для генерации отчета
 */
const loadReportsListBus$ = combineLatest([dateFrom$, dateTo$, reportType$]).pipe(
    map(([dateFrom, dateTo, reportType]) => ({
        dateFrom,
        dateTo,
        reportType,
    })),
    filter(({reportType}) => !!reportType),
);

const loadPlayerStatistic$ = loadReportsListBus$.pipe(
    filter(
        ({reportType}) => [
            ReportType.playerLogs,
            ReportType.deviceReport,
            ReportType.company,
            ReportType.reportVOIS,
            ReportType.reportRAO
        ].includes(reportType as ReportType)),
    tap(() => LoadReportData$.next(true)),
    switchMap(
        ({dateFrom, dateTo}) => {
            const {project} = getCurrentState();

            return new Observable((subscriber) => {
                projectReportsService().getPlayerPlayInfoStatistic({
                    from: dateFrom.toISOString(),
                    to: dateTo.toISOString(),
                    projectId: project
                }).then(value => subscriber.next(value))
                    .catch(error => subscriber.error(error))
            }).pipe(
                catchError((err) => errors$.next(err)),
                finalize(() => LoadReportData$.next(false)),
            )
        }
    )
)

const loadChanelStatistic$ = loadReportsListBus$.pipe(
    filter(
        ({reportType}) => [
            ReportType.channels,
        ].includes(reportType as ReportType)),
    tap(() => LoadReportData$.next(true)),
    switchMap(
        ({dateFrom, dateTo}) => {
            const {project} = getCurrentState();

            return new Observable((subscriber) => {
                projectReportsService().getChannelPlayInfoStatistic({
                    from: dateFrom.toISOString(),
                    to: dateTo.toISOString(),
                    projectId: project
                }).then(value => subscriber.next(value))
                    .catch(error => subscriber.error(error))
            }).pipe(
                catchError(() => console.log('error')),
            finalize(() => LoadReportData$.next(false))
            )
        }
    )
)

const loadFileStatistic$ = loadReportsListBus$.pipe(
    filter(
        ({reportType}) => [
            ReportType.files,
        ].includes(reportType as ReportType)),
    tap(() => LoadReportData$.next(true)),
    switchMap(
        ({dateFrom, dateTo}) => {
            const {project} = getCurrentState();

            return new Observable((subscriber) => {
                projectReportsService().getFilePlayInfoStatistic({
                    from: dateFrom.toISOString(),
                    to: dateTo.toISOString(),
                    projectId: project
                }).then(value => subscriber.next(value))
                    .catch(error => subscriber.error(error))
            }).pipe(
                catchError(() => console.log('error')),
                finalize(() => LoadReportData$.next(false))
            )
        }
    )
)

const reportItems$: Observable<ReportItem[]> = merge(loadPlayerStatistic$, loadChanelStatistic$, loadFileStatistic$);

/**
 * Шина загрузки отчетов
 */
const generateReportsBus$ = combineLatest([reportsIds$, dateFrom$, dateTo$, reportType$]).pipe(
    switchMap(async ([reportsIds, dateFrom, dateTo, reportType]) => {
        const {project} = getCurrentState();

        await projectReportsService().getReports(project, reportType as ReportType, dateFrom, dateTo, reportsIds);
    })
);

const collectBus$: Observable<Pick<ProjectReportPageContextTypes, "dateFrom" | "dateTo">> = combineLatest([dateFrom$, dateTo$, reportType$, reportsList$, selected$]).pipe(
    map(([dateFrom, dateTo, reportType, reportsList, selected]) => ({
        dateFrom,
        dateTo,
        reportType,
        reportsList,
        selected,
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

    subscriber.add(generateReportsBus$.subscribe());
    subscriber.add(reportItems$.subscribe({
        next: value =>
            context$.next({
                ...context$.getValue(),
                reportsList: value
            })
    }));

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
};

/**
 * Записывает выбранные строки
 * @param selected
 */
const setSelected: ProjectReportPageContextActionsTypes["setSelected"] = (
    selected
) => {
    selected$.next(selected);
}

const generateReport: ProjectReportPageContextActionsTypes["generateReport"] = (
    reportsIds
) => {
    reportsIds$.next(reportsIds);
}

const actions: ProjectReportPageContextActionsTypes = {
    setDateFrom,
    setDateTo,
    setReportType,
    setSelected,
    generateReport,
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
