import {ShoulderOfferData, ShoulderOffersDataLoaderInterface} from "./interfaces";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {PriceConditionsServiceInterface} from "../priceConditionsService/interface";
import {graphQLClient} from "../graphQLClient";
import {priceConditionsService} from "../priceConditionsService";
import {loggerFactory} from "../logger";
import {
    ShoulderOffersDataLoaderQuery,
    ShoulderOffersDataLoaderQueryResponse,
    ShoulderOffersDataLoaderQueryResponseItem
} from "./ShoulderOffersDataLoaderQuery";

/**
 * Загрузчик данных по ценовым предложениям для плеч
 */
export class ShoulderOffersDataLoader implements ShoulderOffersDataLoaderInterface {
    private readonly client: GraphQLClient;
    private readonly priceService: PriceConditionsServiceInterface;
    private readonly logger = loggerFactory().make(`ShoulderOffersDataLoader`);

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.priceService = priceConditionsService(token)
    }

    /**
     * Загрузка данных
     * @param shoulderIds
     */
    async Load(shoulderIds: any[]): Promise<ShoulderOfferData[]> {
        try {
            if (shoulderIds.length === 0) {
                return []
            }

            const response = await this.client.Query<null, ShoulderOffersDataLoaderQueryResponse>(new ShoulderOffersDataLoaderQuery(shoulderIds), {});
            this.logger.Debug(`Loaded response with base data`, response);

            if (response.result.length === 0) {
                return []
            }

            const priceConditionsIds = response.result.reduce((result: any[], item: ShoulderOffersDataLoaderQueryResponseItem): any[] => [...result, ...item.offer_conditions], []);
            const priceConditions = await this.priceService.GetConditions(priceConditionsIds);
            this.logger.Debug(`Loaded price conditions`, priceConditions);

            const result: ShoulderOfferData[] = response.result.map(item => {
                return {
                    id: item.id,
                    shoulder_id: item.shoulder_id,
                    cargo_type_group: item.cargo_type_group,
                    containers: item.containers,
                    container_affiliation_id: item.container_affiliation_id,
                    loading_condition_id: item.loading_condition_id,
                    unloading_condition_id: item.unloading_condition_id,
                    active_from: item.active_from,
                    active_to: item.active_to,
                    offer_conditions: priceConditions.filter(c => item.offer_conditions.indexOf(`${c.id}`) !== -1),
                } as ShoulderOfferData
            });

            this.logger.Debug(`Loaded conditions`, result);
            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return []
        }
    }
}