/**
 * Страница с мета тегами
 */
export type PageWithMetaTags<T extends object = {}> = T & Partial<{
    title: string
    header: string
    isNeedUI: boolean
}>