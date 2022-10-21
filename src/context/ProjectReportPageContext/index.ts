import { ReportType } from "components/ProjectReports/types";
import { useEffect, useState } from "react";
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  OperatorFunction,
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
}

const context$ = new BehaviorSubject<ProjectReportPageContextTypes>(
  new DefaultContextData()
);

const dateFrom$ = new BehaviorSubject<Date>(new Date());
const dateTo$ = new BehaviorSubject<Date>(new Date());
const reportType$ = new BehaviorSubject<keyof ReportType | undefined>(undefined);
const reportsList$ = new BehaviorSubject<any>({});
const errors$ = new BehaviorSubject<any>([]);

const loadReportsListBus$ = combineLatest([dateFrom$, dateTo$, reportType$]).pipe(
  map(([dateFrom, dateTo, reportType]) => ({
    dateFrom,
    dateTo,
    reportType,
  })),
  filter(({reportType}) => !reportType),
  switchMap(async ({dateFrom, dateTo, reportType}) => {
    try {
      const listData = await projectReportsService().getReportsList(reportType as keyof ReportType, dateFrom, dateTo);

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

const collectBus$: Observable<
  Pick<ProjectReportPageContextTypes, "dateFrom" | "dateTo">
> = combineLatest([dateFrom$, dateTo$, reportType$, reportsList$]).pipe(
  map(([dateFrom, dateTo, reportType, reportsList]) => ({
    dateFrom,
    dateTo,
    reportType,
    reportsList,
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

const actions: ProjectReportPageContextActionsTypes = {
  setDateFrom,
  setDateTo,
  setReportType,
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
