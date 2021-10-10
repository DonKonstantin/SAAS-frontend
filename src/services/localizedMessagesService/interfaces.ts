import {Collection} from "../types";

/**
 * Сущность локализованного сообщения
 */
export interface LocalizedMessage {
    id: string
    lang_id: string
    message: string
}

/**
 * Сущность словаря сообщений
 */
export interface LocalizedDictionary {
    [L: string]: Collection<LocalizedMessage>
}

/**
 * Сервис работы с локализованными сообщениями
 */
export interface LocalizedMessagesServiceInterfaces {
    /**
     * Получение листинга локализованных сообщений по ID.
     * В результатах возвращает картированный результат с ключем - langID.
     * @param ids
     */
    GetMessages(ids: string[]): Promise<Collection<LocalizedMessage>>

    /**
     * Получение листинга словаря для нескольких фраз по их ID
     * @param ids
     */
    GetDictionaryMessages(ids: string[]): Promise<LocalizedDictionary>

    /**
     * Сохраняет сообщения и возвращает результат.
     * Если сообщение было создано - для него присваивается ID.
     * @param messages
     */
    StoreMessages(messages: Collection<LocalizedMessage>): Promise<Collection<LocalizedMessage>>
}
