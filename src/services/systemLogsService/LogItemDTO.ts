import {LogItem, LogItemGraphResponse} from "./interface";


// Преобразование
export const logsDTOFactory = (logs: Partial<LogItemGraphResponse | LogItem>[]): LogItem[] => {
    return logs.map(({user, ...log}) => ({
       date: new Date(log.date),
        entityId: log.entityId || "",
        entityName: log.entityName || "",
        entityType: log.entityType || "",
        eventType: log.eventType || "",
        eventTypeName: log.eventTypeName || "",
        user: {
            email: user && user.email || "",
            firstName: user && user.firstName || "",
            id: user && user.id || "",
            lastName: user && user.lastName || "",
        },
        userId: log.userId || "",
    }))
}
