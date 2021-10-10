import {LocalizedMessagesServiceInterfaces} from "./interfaces";
import { LocalizedMessagesService } from "./LocalizedMessagesService";

/**
 * Фабрика сервиса
 * @param token
 */
export const localizedMessagesService: {(token?: string): LocalizedMessagesServiceInterfaces} = token => {
    return new LocalizedMessagesService(token)
}