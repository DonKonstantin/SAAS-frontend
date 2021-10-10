import {LocalizedMessage} from "../localizedMessagesService/interfaces";

/**
 * Получение локализованного сообещния для переданного языка
 * @param defaultName
 * @param localization
 * @param langId
 */
export const getLocalization = (defaultName: string, localization: LocalizedMessage[], langId: string): string => {
    const message = localization.find(l => l.lang_id === langId);
    if (!message) {
        return defaultName
    }

    if (0 === message.message.length) {
        return defaultName
    }

    return message.message
};