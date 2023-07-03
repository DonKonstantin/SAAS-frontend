import { VariantType } from 'notistack';

// Интерфейс уведомления
export interface DispatchNotification {
    readonly type: VariantType,
    readonly message: string,
}

// Зарегистрированное в системе уведомление
export interface Message extends DispatchNotification {
    readonly id: string;
    isUnread: boolean;
}

// Интерфейс службы доставки уведомлений
export interface NotificationsDispatcher {
    // Доставка уведомлений.
    dispatch(notification: DispatchNotification): void;

    // Пометить уведомления как прочитанные.
    read(notifications: Message[]): void;

    // Возвращает список не прочитанных сообщений.
    getUnreadNotifications(): Message[];

    // Получение списка сообщений.
    get(): Message[];

    // Удалить уведомление из пула.
    delete(notifications: Message[]): void;
}

// Канал доставки уведомлений
export interface DispatcherChannel {
    // Доставка уведомлений.
    dispatch(notification: Message): void;

    // Пометить уведомления как прочитанные.
    read(notifications: Message[]): void;

    // Возвращает список сообщений.
    get(): Message[];

    // Удалить уведомление из пула.
    delete(notifications: Message[]): void;
}
