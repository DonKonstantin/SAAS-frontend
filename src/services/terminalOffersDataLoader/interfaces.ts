import {TerminalLoadingUnloadingOfferDataResult} from "../terminalLoadingUnloadingOfferDataLoader/interfaces";

/**
 * Результат загрузки данных по услугам для терминала
 */
export interface TerminalOfferData {
    id: string
    terminal_id: string
    cargo_type_group: string
    delivery_modes: string[]
    containers: string[]
    loading_offers: TerminalLoadingUnloadingOfferDataResult[]
}

/**
 * Загрузчик данных по услугам для терминала
 */
export interface TerminalOffersDataLoaderInterface {
    /**
     * Загрузка данных
     * @param terminalIds
     */
    Load(terminalIds: any[]): Promise<TerminalOfferData[]>
}