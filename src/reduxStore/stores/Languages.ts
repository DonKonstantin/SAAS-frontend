// Сущность языка
export interface Language {
    id: string
    code: string
    name: string
    is_default: boolean
    is_right_text_align: boolean
    is_secondary_default_for_admin: boolean
}

// Store для хранения языков
export interface LanguagesStore {
    primaryLangId: string
    secondaryLangId: string
    languages: Language[]
}

// Акции, связанные с хранилищем языков
export interface LanguagesStoreActionTypes {
    LANGUAGES_CHANGE_PRIMARY_LANG: string
    LANGUAGES_CHANGE_SECONDARY_LANG: string
    LANGUAGES_NEED_RELOAD_LANGUAGES: string | undefined
    LANGUAGES_STORE_RELOAD_LANGUAGES: LanguagesStore
    LANGUAGES_NEED_RESET_LANGUAGES: undefined
}