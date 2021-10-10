// Переведенный текст
export type Translation = {
    languageId: string
    translation: string
}

/**
 * Перевод переданного текста на указанные языки
 */
export interface TranslationServiceInterface {
    /**
     * Перевод переданных текстов
     *
     * @param text
     * @param sourceLang
     * @param languages
     */
    Translate(text: string, sourceLang: string, languages: string[]): Promise<Translation[]>
}