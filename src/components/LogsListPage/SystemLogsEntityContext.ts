import {LogsFilterParams, LogsLevel, LogsOrderBy} from "../../services/systemLogsService/interface";
import {auditTime, BehaviorSubject, distinctUntilChanged, OperatorFunction, switchMap} from "rxjs";
import {useEffect, useState} from "react";
import systemLogsService from "../../services/systemLogsService";

type SystemLogsContext = {
    orderBy: LogsOrderBy,
    direction: "asc" | "desc",
    filter: LogsFilterParams,
    structureId: string,
    level: LogsLevel,
    limit: number,
    offset: number,
    count: number,
    isLoading: boolean,
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
    limit: number = 30;
    offset: number = 0;
    orderBy: LogsOrderBy = LogsOrderBy.date;
    structureId: string = "";
    count: number = 0;
    isLoading: boolean = false;
}

const systemLogsContext$ = new BehaviorSubject<SystemLogsContext>(new SystemLogsDefaultContext());

const loadLogsBus$ = systemLogsContext$.pipe(
    auditTime(400),
);

const loadQuantityBus$ = systemLogsContext$.pipe(
    distinctUntilChanged(
        (previous, current) => {
            return previous.filter.date === current.filter.date
            || previous.filter.entityType === current.filter.entityType
            || previous.filter.entityId === current.filter.entityId
            || previous.filter.userId === current.filter.userId
            || previous.filter.eventType === current.filter.eventType
            || previous.filter.userName === current.filter.userName
            || previous.structureId === current.structureId
            || previous.level === current.level
        }
    ),
    switchMap<SystemLogsContext>(async ({
                   filter, level, structureId
        }) => await systemLogsService().LoadQuantity(structureId, level, filter)
    )
)

const initEntityContext: SystemLogsContextActions["initEntityContext"] = (level, structureId) => {
    const subscribers = loadLogsBus$.subscribe();

    setStructureId(structureId);
    setLevel(level)

    subscribers.add(
        loadQuantityBus$.subscribe()
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
                direction: direction === "asc" ? "desc" : "asc",
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
    const {filter, ...other} = systemLogsContext$.getValue();

    systemLogsContext$.next({
        ...other,
        filter: {
            ...filter,
            [field]: value,
        },
    });
}

const setLimit: SystemLogsContextActions["setLimit"] = (limit) => {
    systemLogsContext$.next({
        ...systemLogsContext$.getValue(),
        limit,
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

