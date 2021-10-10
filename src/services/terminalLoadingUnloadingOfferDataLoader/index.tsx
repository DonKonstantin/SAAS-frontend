import {TerminalLoadingUnloadingOfferDataInterface} from "./interfaces";
import {TerminalLoadingUnloadingOfferData} from "./TerminalLoadingUnloadingOfferData";

// Фабрика сервиса
export const terminalLoadingUnloadingOfferData: {(token?: string): TerminalLoadingUnloadingOfferDataInterface} = (token?: string) => {
    return new TerminalLoadingUnloadingOfferData(token);
};