import {TerminalOfferData, TerminalOffersDataLoaderInterface} from "./interfaces";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";
import {
    TerminalOffersDataLoaderQuery,
    TerminalOffersDataLoaderQueryResponse,
    TerminalOffersDataLoaderQueryResponseItem
} from "./TerminalOffersDataLoaderQuery";
import {TerminalLoadingUnloadingOfferDataInterface} from "../terminalLoadingUnloadingOfferDataLoader/interfaces";
import {terminalLoadingUnloadingOfferData} from "../terminalLoadingUnloadingOfferDataLoader";

/**
 * Загрузчик данных по услугам для терминала
 */
export class TerminalOffersDataLoader implements TerminalOffersDataLoaderInterface {
    private readonly client: GraphQLClient;
    private readonly terminalLoadingUnloadingOfferDataLoader: TerminalLoadingUnloadingOfferDataInterface;
    private readonly logger = loggerFactory().make(`TerminalOffersDataLoader`);

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.terminalLoadingUnloadingOfferDataLoader = terminalLoadingUnloadingOfferData(token)
    }

    /**
     * Загрузка данных
     * @param terminalIds
     */
    async Load(terminalIds: any[]): Promise<TerminalOfferData[]> {
        try {
            if (terminalIds.length === 0) {
                return []
            }

            const response = await this.client.Query<null, TerminalOffersDataLoaderQueryResponse>(new TerminalOffersDataLoaderQuery(terminalIds), {});
            this.logger.Debug(`Loaded response with base data`, response);

            if (response.result.length === 0) {
                return []
            }

            const loadingOffersIds = response.result.reduce((result: any[], item: TerminalOffersDataLoaderQueryResponseItem): any[] => [...result, ...item.loading_offers], []);
            const loadingOffers = await this.terminalLoadingUnloadingOfferDataLoader.Load(loadingOffersIds);
            this.logger.Debug(`Loaded price conditions`, loadingOffers);

            const result: TerminalOfferData[] = response.result.map(item => {
                return {
                    ...item,
                    loading_offers: loadingOffers.filter(c => item.loading_offers.indexOf(`${c.id}`) !== -1)
                } as TerminalOfferData
            });

            this.logger.Debug(`Loaded conditions`, result);
            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return []
        }
    }
}