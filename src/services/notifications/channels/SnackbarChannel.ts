import {DispatcherChannel, Message} from "../NotificationsDispatcher";
import { OptionsObject } from "notistack";
import * as React from "react";

export type EnqueueSnackbar = (message: string | React.ReactNode, options?: OptionsObject) => OptionsObject['key'] | null;

/**
 * Канал доставки высплывающих уведомлений
 */
export class SnackbarChannel implements DispatcherChannel {

    private readonly enqueueSnackbar: EnqueueSnackbar;

    /**
     * Конструктор канала
     *
     * @param enqueueSnackbar
     */
    constructor(enqueueSnackbar: EnqueueSnackbar) {
        this.enqueueSnackbar = enqueueSnackbar;
    }


    // Заглушка обработки удаления сообщений
    delete(): void {
    }

    /**
     * Доставка уведомлений в Snackbar
     *
     * @param notification
     */
    dispatch(notification: Message): void {
        this.enqueueSnackbar(notification.message, {
            variant: notification.type,
            preventDuplicate: false,
            autoHideDuration: 3000,
        })
    }

    // Заглушка получения сообщений
    get(): Message[] {
        return [];
    }

    // Заглушка
    read(): void {
    }
}
