/**
 * Service for Notification Templates
 */
export interface NotificationTemplateServiceInterface {
    /**
     * Load all available templates
     */
    loadAll(): Promise<NotificationTemplate[]>
}

// Entity Notification Template
export type NotificationTemplate = {
    id: string;
    name: string;
    body: string;
    recipient: string
    title: string
}

// Response on query load all available templates
export type LoadAllTemplatesQueryResponse = {
    templates: NotificationTemplate[]
}
