import {ShoulderAllowancesLoaderInterface} from "./interface";
import {GraphQLClient} from "../../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../../logger/Logger";
import {AllowanceOffer} from "../../shoulderTypes";
import {ShoulderOfferConditionsLoaderInterface} from "../shoulderOfferConditionsLoader/interface";
import {ShoulderAllowancesLoaderQuery, ShoulderAllowancesLoaderQueryResponse} from "./ShoulderAllowancesLoaderQuery";

/**
 * Сервис загрузки надбавок из импорта
 */
export class ShoulderAllowancesLoader implements ShoulderAllowancesLoaderInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;
    private readonly shoulderOfferConditionsLoader: ShoulderOfferConditionsLoaderInterface;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     * @param shoulderOfferConditionsLoader
     */
    constructor(
        client: GraphQLClient,
        logger: LoggerFactory,
        shoulderOfferConditionsLoader: ShoulderOfferConditionsLoaderInterface,
    ) {
        this.client = client;
        this.logger = logger.make(`ShoulderAllowancesLoader`);
        this.shoulderOfferConditionsLoader = shoulderOfferConditionsLoader;
    }

    /**
     * Загрузка данных надбавок из импорта для переданного списка id
     * @param ids
     */
    async Load(ids: string[]): Promise<AllowanceOffer[]> {
        try {
            if (0 === ids.length) {
                return [];
            }

            const query = new ShoulderAllowancesLoaderQuery(ids);
            this.logger.Debug(`Created allowances load query`, query);

            const resp = await this.client.Query<{ids: string[]}, ShoulderAllowancesLoaderQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Loaded allowances DTO by ID`, resp.result);

            const conditionIds: string[] = [];
            for (let allowanceDTO of resp.result) {
                conditionIds.push(...allowanceDTO.offer_conditions)
            }

            const conditions = await this.shoulderOfferConditionsLoader.LoadCondition(conditionIds);

            const allowances: AllowanceOffer[] = resp.result.map(dto => {
                const filteredConditions = conditions.filter(c => dto.offer_conditions.indexOf(c.import_id) !== -1);
                return {
                    ...dto,
                    offer_conditions: filteredConditions,
                };
            });
            this.logger.Debug(`Loaded allowances by ID`, allowances);

            return allowances
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }
}