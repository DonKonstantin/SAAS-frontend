import {ShoulderOfferSearchServiceInterface} from "./interface";
import {Values} from "../../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../../shoulderImportTaskService/shoulderTypes";
import {GraphQLClient} from "../../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../../logger/Logger";
import {
    ShoulderOfferSearchServiceQuery,
    ShoulderOfferSearchServiceQueryResponse,
    Variables
} from "./ShoulderOfferSearchServiceQuery";

/**
 * Сервис поиска условия ЦП для переданных параметров
 */
export class ShoulderOfferSearchService implements ShoulderOfferSearchServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ShoulderOfferSearchService`);
    }

    /**
     * Поиск первого доступного предложения для переданных параметров
     * @param shoulderId
     * @param offer
     */
    async searchOffer(shoulderId: string, offer: Values<ShoulderOffer>): Promise<string | null> {
        try {
            // @ts-ignore
            const offerData: ShoulderOffer = {};
            (Object.keys(offer) as (keyof ShoulderOffer)[]).map(key => {
                // @ts-ignore
                offerData[key] = offer[key].value
            });

            if (!!offerData.id) {
                return offerData.id
            }

            if (!offerData.container_affiliation_id) {
                // @ts-ignore
                offerData.container_affiliation_id = 'null'
            }

            const response = await this.client.Query<Variables, ShoulderOfferSearchServiceQueryResponse>(
                new ShoulderOfferSearchServiceQuery(shoulderId, offerData),
                {},
            );

            const validationData = JSON.stringify([[...offerData.delivery_modes].sort(), [...offerData.containers].sort()]);
            const validOffers = response.result.filter(({delivery_modes, containers}) => {
                return validationData === JSON.stringify([delivery_modes.sort(), containers.sort()])
            });

            if (0 === validOffers.length) {
                return null;
            }

            return validOffers[0].id
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return null
        }
    }
}