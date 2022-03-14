// Данные лога по пользователю
export type UserLog = {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
}

// Logs item system
export type LogItem = {
    date: Date;
    entityId: string;
    entityName: string;
    entityType: string;
    eventType: string;
    eventTypeName: string;
    user: UserLog;
    userId: string;
}

export type LogItemGraphResponse = {
    date: string;
    entityId: string;
    entityName: string;
    entityType: string;
    eventType: string;
    eventTypeName: string;
    user: UserLog;
    userId: string;
}

// Logs level for logs
export enum LogsLevel {
    realm = 'realm',
    domain = 'domain',
    project = 'project',
}

export enum LogsActionType {
    created = "created",
    updated = "updated",
    deleted = "deleted",
}

export enum LogsOrderBy {
    user = "user",
    date = "date",
    event = "event",
    entity = "entity"
}

export type LogsFilterParams = {
    entityType?: string[];
    eventType?: LogsActionType[];
    date?: Date[];
    userId?: string[];
    userName?: string;
    entityId?: string[];
}

export type LoadLogsParams = {
    orderBy: LogsOrderBy,
    direction: "asc" | "desc",
    filter: LogsFilterParams,
    structure: string,
    level: LogsLevel,
    limit: number,
    offset: number,
}

// Сервис для работы с логами системы
export interface SystemLogsServiceInterface {
    // Загрузка логов
    Load(params: LoadLogsParams ): Promise<LogItem[]>;

    // получение количества элементов логов
    LoadQuantity(
        structureId: string,
        level: LogsLevel,
        filter: LogsFilterParams,
    ): Promise<number>;
}
