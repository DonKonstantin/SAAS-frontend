import { ReportType } from "components/ProjectReports/types";
import { getCurrentState } from "context/AuthorizationContext";
import { useEffect, useState } from "react";
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  OperatorFunction,
  Subject,
  switchMap,
} from "rxjs";
import { projectReportsService } from "services/ProjectReportsService";
import {
  ProjectReportPageContextActionsTypes,
  ProjectReportPageContextCommonType,
  ProjectReportPageContextTypes,
} from "./interface";

class DefaultContextData implements ProjectReportPageContextTypes {
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  reportType: undefined;
  selected: string[] = [];
  reportsList: any[] = [];
}

const context$ = new BehaviorSubject<ProjectReportPageContextTypes>(
  new DefaultContextData()
);

const dateFrom$ = new BehaviorSubject<Date>(new Date());
const dateTo$ = new BehaviorSubject<Date>(new Date());
const reportType$ = new BehaviorSubject<keyof ReportType | undefined>(undefined);
const reportsList$ = new BehaviorSubject<any>([]);
const errors$ = new BehaviorSubject<any>({});
const selected$ = new BehaviorSubject<string[]>([]);
const reportsIds$ = new Subject<string[]>();

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
  switchMap(async ({dateFrom, dateTo, reportType}) => {
    const {project} = getCurrentState();
    
    try {
      const listData = await projectReportsService().getReportsList(reportType as keyof ReportType, project, dateFrom, dateTo);

      reportsList$.next(listData);
    } catch (error) {
      reportsList$.next({});

      errors$.next({
        [`${reportType as string}`]: error
      });

      return undefined;
    }
  })
);

/**
 * Шина загрузки отчетов
 */
const generateReportsBus$ = combineLatest([reportsIds$, dateFrom$, dateTo$, reportType$]).pipe(
  switchMap(async ([reportsIds, dateFrom, dateTo, reportType]) => {
    const {project} = getCurrentState();

    await projectReportsService().getReports(project, reportType as keyof ReportType, dateFrom, dateTo, reportsIds);
  })
);

const collectBus$: Observable<
  Pick<ProjectReportPageContextTypes, "dateFrom" | "dateTo">
> = combineLatest([dateFrom$, dateTo$, reportType$, reportsList$, selected$]).pipe(
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
