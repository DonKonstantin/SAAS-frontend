import {Schemas} from "../../settings/schema";
import {ListFieldRow} from "../listDataLoader/listLoader/types";
import {Unsubscribable} from "rxjs/internal/types";

/**
 * Сервис генерации подписки на событие изменения сущностей
 */
export interface ListSubscriptionServiceInterface {
    /**
     * Генерация подписки на событие изменения сущностей
     * @param schema
     * @param callback
     */
    SubscribeToChanges<T extends keyof Schemas>(
        schema: T,
        callback: {(eventType: "updated" | "deleted", changedRow: ListFieldRow<T>): void},
    ): Unsubscribable | undefined
}