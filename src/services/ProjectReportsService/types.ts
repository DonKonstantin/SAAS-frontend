/**
 * Общие поля для объектов статистики по прогирыванию
 */
export type PlayInfoStatistic = {
    id: string
    name: string
    played: number
}

/**
 * Статистика по каналам
 */
export type ChannelPlayInfoStatistic = PlayInfoStatistic & {
    channel: {
        id: string
        is_active: boolean
        name: string
        project_id: string
    }
}


export type GlobalFilePlayInfoStatistic = PlayInfoStatistic & {

}

/**
 * Статистика по каналу плеера
 */
export type ReportPlayerChannel = {
    campaignId: string
    channelId: string
    id?: string
    playerId: string
}

/**
 * Статистика по плеерам
 */
export type PlayerPlayInfoStatistic = PlayInfoStatistic & {
    player: {
        authorization_token: string
        campaigns: ReportPlayerChannel[]
        guid: string
        id?: string
        last_query: Date
        last_update: Date
        name: string
        object_passport_id?: string
        player_code_id: string
        project_id: string
    }
}


/**
 * Статистика по файлам проекта
 */
export type ProjectFilePlayInfoStatistic = PlayInfoStatistic & {

}

/**
 * Параметры запроса для получения статистики
 */
export type PlayInfoStatisticQueryParams = {
    projectId: string
    from: string
    to: string
}