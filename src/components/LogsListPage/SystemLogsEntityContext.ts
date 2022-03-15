import {LogItem, LogsFilterParams, LogsLevel, LogsOrderBy} from "../../services/systemLogsService/interface";
import {
    auditTime,
    BehaviorSubject,
    combineLatestWith,
    distinctUntilChanged,
    map,
    OperatorFunction,
    Subject,
    switchMap,
    tap
} from "rxjs";
import {useEffect, useState} from "react";
import systemLogsService from "../../services/systemLogsService";

type SystemLogsContext = {
    orderBy: LogsOrderBy | undefined,
    direction: "asc" | "desc",
    filter: LogsFilterParams,
    structureId: string,
    level: LogsLevel,
    limit: number,
    offset: number,
    count: number,
    isLoading: boolean,
    entityItems: LogItem[],
    hasError: boolean
}

type SystemLogsContextActions = {
    setSortField(orderBy?: LogsOrderBy): void;
    setFilterField<K extends keyof LogsFilterParams>(field: K, value?: LogsFilterParams[K]): void;
    resetFilter(): void;
    setStructureId(id: string): void;
    setLevel(level: LogsLevel): void;
    setOffset(offset: number): void;
    setLimit(limit: number): void;
    initEntityContext(level: LogsLevel, structureId: string, offset?: number, limit?: number): () => void;
}

class SystemLogsDefaultContext implements SystemLogsContext {
    direction: "asc" | "desc" = "asc";
    filter: LogsFilterParams = {};
    level: LogsLevel = LogsLevel.domain;
    limit: number = 25;
    offset: number = 0;
    orderBy: LogsOrderBy = LogsOrderBy.date;
    structureId: string = "";
    count: number = 0;
    isLoading: boolean = false;
    entityItems: LogItem[] = [];
    hasError: boolean = false
}

const filterState$ = new BehaviorSubject<LogsFilterParams>({})

const systemLogsContext$ = new BehaviorSubject<SystemLogsContext>(new SystemLogsDefaultContext());

export const systemLogsLoadingInProgress = new Subject<boolean>();


const updateDataBus$ = systemLogsContext$.pipe(
    combineLatestWith(filterState$.pipe(
            distinctUntilChanged(
                (previous, current) => {
                    return previous.date === current.date
                        || previous.entityType === current.entityType
                        || previous.entityId === current.entityId
                        || previous.userId === current.userId
                        || previous.eventType === current.eventType
                        || previous.userName === current.userName
                }
            )
        )
    ),
    auditTime(400),
    map(([baseState$, filterState$]) => ({
        ...baseState$,
        filter: filterState$
    }))
)


const loadLogsBus$ = updateDataBus$.pipe(
    auditTime(400),
    distinctUntilChanged(
        (previous, current) => {
            return previous.level === current.level
                && previous.limit === current.limit
                && previous.offset === current.offset
                && previous.direction === current.direction
                && previous.orderBy === current.orderBy
        }
    ),
    tap(() => systemLogsLoadingInProgress.next(true)),
    switchMap(
        async ({
                   filter,
                   level,
                   structureId,
                   orderBy,
                   direction,
                   offset,
                   limit
               }) => await systemLogsService().Load({
            filter,
            level,
            structureId,
            orderBy,
            direction,
            offset,
            limit
        })
    ),
    tap(() => systemLogsLoadingInProgress.next(false))
);

const loadQuantityBus$ = updateDataBus$.pipe(
    auditTime(400),
    distinctUntilChanged(
        (previous, current) => {
            return previous.structureId === current.structureId
                || previous.level === current.level
        }
    ),
    switchMap(
        async ({
                   filter, level, structureId
               }) => await systemLogsService().LoadQuantity(structureId, level, filter)
    )
)

const initEntityContext: SystemLogsContextActions["initEntityContext"] = (level, structureId) => {
    const subscribers = loadLogsBus$.subscribe({
        next: items => {
            systemLogsContext$.next({
                ...systemLogsContext$.getValue(),
                entityItems: items
            })
        },
        error: err => {
            systemLogsContext$.next({
                ...systemLogsContext$.getValue(),
                hasError: !!err
            })
        }
    });

    setStructureId(structureId);
    setLevel(level)

    subscribers.add(
        loadQuantityBus$.subscribe({
            next: count => {
                systemLogsContext$.next({
                    ...systemLogsContext$.getValue(),
                    count
                })
            },
            error: err => {
                systemLogsContext$.next({
                    ...systemLogsContext$.getValue(),
                    hasError: !!err
                })
            }
        })
    );

    return () => subscribers.unsubscribe();
}

const setStructureId: SystemLogsContextActions["setStructureId"] = structureId => {
    systemLogsContext$.next({
        ...systemLogsContext$.getValue(),
        structureId,
    });
}

const setLevel: SystemLogsContextActions["setLevel"] = level => {
    systemLogsContext$.next({
        ...systemLogsContext$.getValue(),
        level,
    });
}

const setSortField: SystemLogsContextActions["setSortField"] = newOrderBy => {
    const {orderBy, direction, ...other} = systemLogsContext$.getValue()

    if (newOrderBy === orderBy) {
        systemLogsContext$.next({
                ...other,
                orderBy,
                direction: direction === "desc" ? "asc" : "desc",
            }
        )

        return;
    }

    systemLogsContext$.next({
            ...other,
            orderBy: newOrderBy ? newOrderBy : LogsOrderBy.date,
            direction: "asc",
        }
    );
}

const resetFilter: SystemLogsContextActions["resetFilter"] = () => {
    systemLogsContext$.next({
        ...systemLogsContext$.getValue(),
        filter: {},
    });
}

const setFilterField: SystemLogsContextActions["setFilterField"] = (field, value) => {
    const filter = filterState$.getValue();

    filterState$.next({
        ...filter,
        [field]: value,
    });
}

const setLimit: SystemLogsContextActions["setLimit"] = (limit) => {
    systemLogsContext$.next({
        ...systemLogsContext$.getValue(),
        limit,
        offset: 0
    });
}

const setOffset: SystemLogsContextActions["setOffset"] = (offset) => {
    systemLogsContext$.next({
        ...systemLogsContext$.getValue(),
        offset,
    });
}

const actions: SystemLogsContextActions = {
    initEntityContext,
    setStructureId,
    setLevel,
    setSortField,
    resetFilter,
    setFilterField,
    setLimit,
    setOffset,
}


export type WithSystemLogsEntity<T = {}> = SystemLogsContext
    & SystemLogsContextActions
    & T
    ;

export const useSystemLogsEntity = (...pipeModifications: OperatorFunction<any, SystemLogsContext>[]): WithSystemLogsEntity => {
    const [contextValue, setContextValue] = useState(systemLogsContext$.getValue())
    useEffect(() => {
        const subscription = systemLogsContext$
            // @ts-ignore
            .pipe(...pipeModifications)
            .subscribe({
                next: data => setContextValue(data)
            })

        return () => {
            try {
                subscription.unsubscribe()
            } catch (e) {
            }
        }
    })

    return {
        ...contextValue,
        ...actions
    }
}

