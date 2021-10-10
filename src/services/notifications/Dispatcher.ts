import {DispatcherChannel, DispatchNotification, Message, NotificationsDispatcher} from "./NotificationsDispatcher";
import { VariantType } from "notistack";
import { v4 as uuid } from "uuid";

/**
 * Зарегистрированное сообщение
 */
class RegisteredMessage implements Message {
    readonly id: string = uuid();
    isUnread: boolean = true;

    readonly message: string;
    readonly type: VariantType;

    /**
     * Конструктор уведомлений
     *
     * @param type
     * @param message
     */
    constructor(type: VariantType, message: string) {
        this.type = type;
        this.message = message;
    }
}

/**
 * Диспетчер уведомлений
 */
export class Dispatcher implements NotificationsDispatcher {

    private readonly channels: DispatcherChannel[];

    /**
     * Конструктор службы
     *
     * @param channels
     */
    constructor(...channels: DispatcherChannel[]) {
        this.channels = channels;
    }


    /**
     * Удалить уведомление из пула.
     *
     * @param notifications
     */
    delete(notifications: Message[]): void {
        this.channels.map(channel => channel.delete(notifications));
    }

    /**
     * Доставка уведомлений.
     *
     * @param notification
     */
    dispatch(notification: DispatchNotification): void {
        let message = new RegisteredMessage(notification.type, notification.message);
        message.isUnread = false;

        this.channels.map(channel => channel.dispatch(message))
    }

    /**
     * Получение списка сообщений.
     */
    get(): Message[] {
        return this.channels
            .reduce<Message[]>((result: Message[], channel: DispatcherChannel): Message[] => {
                let collection = [...result];
                channel.get().map(message => {
                    if (!collection.map(item => item.id).includes(message.id)) {
                        collection.push(message);
                    }
                });

                return collection
            }, [])
            ;
    }

    /**
     * Возвращает список не прочитанных сообщений.
     */
    getUnreadNotifications(): Message[] {
        return this.get().filter(message => message.isUnread);
    }

    /**
     * Пометить уведомления как прочитанные.
     *
     * @param notifications
     */
    read(notifications: Message[]): void {
        this.channels.map(channel => channel.read(notifications));
    }
}
