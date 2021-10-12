/**
 * Страница с мета тегами
 */
export type PageWithMetaTags<T extends object> = T & {
    title: string
    header: string
    isNeedUI?: boolean
}