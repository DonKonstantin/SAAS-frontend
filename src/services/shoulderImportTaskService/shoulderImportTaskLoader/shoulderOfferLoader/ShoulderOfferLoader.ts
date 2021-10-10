import {ShoulderOfferLoaderInterface} from "./interface";
import {GraphQLClient} from "../../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../../logger/Logger";
import {ShoulderOfferConditionsLoaderInterface} from "../shoulderOfferConditionsLoader/interface";
import {ShoulderOffer} from "../../shoulderTypes";
import {ShoulderAllowancesLoaderInterface} from "../shoulderAllowancesLoader/interface";
import {ShoulderOfferLoaderQuery, ShoulderOfferLoaderQueryResponse} from "./ShoulderOfferLoaderQuery";

/**
 * Сервис загрузки ЦП плеч
 */
export class ShoulderOfferLoader implements ShoulderOfferLoaderInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;
    private readonly shoulderOfferConditionsLoader: ShoulderOfferConditionsLoaderInterface;
    private readonly shoulderAllowancesLoader: ShoulderAllowancesLoaderInterface;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     * @param shoulderOfferConditionsLoader
     * @param shoulderAllowancesLoader
     */
    constructor(
        client: GraphQLClient,
        logger: LoggerFactory,
        shoulderOfferConditionsLoader: ShoulderOfferConditionsLoaderInterface,
        shoulderAllowancesLoader: ShoulderAllowancesLoaderInterface,
    ) {
        this.client = client;
        this.logger = logger.make(`ShoulderOfferLoader`);
        this.shoulderOfferConditionsLoader = shoulderOfferConditionsLoader;
        this.shoulderAllowancesLoader = shoulderAllowancesLoader;
    }

    /**
     * Загрузка данных ЦП из импорта для переданного списка id
     * @param ids
     */
    async Load(ids: string[]): Promise<(ShoulderOffer & {shoulder_id: string})[]> {
        try {
            if (0 === ids.length) {
                return [];
            }

            const query = new ShoulderOfferLoaderQuery(ids);
            this.logger.Debug(`Created shoulder offers load query`, query);

            const resp = await this.client.Query<{ids: string[]}, ShoulderOfferLoaderQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Loaded shoulder offers DTO by ID`, resp.result);

            const conditionIds: string[] = [];
            const allowanceIds: string[] = [];
            for (let offerDTO of resp.result) {
                conditionIds.push(...offerDTO.offer_conditions);
                allowanceIds.push(...offerDTO.allowance_offers);
            }

            const [conditions, allowances] = await Promise.all([
                this.shoulderOfferConditionsLoader.LoadCondition(conditionIds),
                this.shoulderAllowancesLoader.Load(allowanceIds),
            ]);

            const offers: (ShoulderOffer & {shoulder_id: string})[] = resp.result.map(dto => {
                const filteredConditions = conditions.filter(c => dto.offer_conditions.indexOf(c.import_id) !== -1);
                const filteredAllowances = allowances.filter(a => dto.allowance_offers.indexOf(a.import_id) !== -1);
                return {
                    ...dto,
                    offer_conditions: filteredConditions,
                    allowance_offers: filteredAllowances,
                    active_from: new Date(dto.active_from),
                    active_to: new Date(dto.active_to),
                };
            });
            this.logger.Debug(`Loaded shoulder offers by ID`, offers);

            return offers
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }
}