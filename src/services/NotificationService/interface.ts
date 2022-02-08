/**
 * Сервис по работе с шаблонами рассылок
 */
export interface NotificationServiceInterface {
    /**
     * Генерация сообщения
     * @param template
     * @param templateVariables
     */
    render(template: string, templateVariables: Object): Promise<string>

    /**
     * Запуск отправки
     * @param templateId
     * @param templateVariables
     * @param channel
     */
    send(templateId: number, templateVariables: Object, channel: NotificationChannel): Promise<boolean>
}

// Возможные каналы отправки оповещений
export enum NotificationChannel {
    "mail" = "mail"
}

/**
 * Параметры запроса на рендер шаблона
 */
export type RenderNotificationQueryVariables = {
    template: string;
    data: string
}

// Результат выполнения запроса на рендер шаблона
export type RenderNotificationQueryResponse = {
    template: {
        template: string
    }
}

// Параметры запроса на отправку оповещения
export type SendNotificationQueryVariables = {
    templateId: number,
    data: string,
}

// Результат выполнения запроса на отправку оповещения
export type SendNotificationQueryResponse = {
    result: {
        success: boolean
    }
}
