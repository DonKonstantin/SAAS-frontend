import {TerminalOffersDataLoaderInterface} from "./interfaces";
import {TerminalOffersDataLoader} from "./TerminalOffersDataLoader";

/**
 * Фабрика сервиса
 * @param token
 */
export const terminalOffersDataLoader: {(token?: string): TerminalOffersDataLoaderInterface} = token => (
    new TerminalOffersDataLoader(token)
);