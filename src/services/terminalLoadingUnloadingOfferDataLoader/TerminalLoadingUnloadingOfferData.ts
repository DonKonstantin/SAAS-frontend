import {
    TerminalLoadingUnloadingOfferDataInterface,
    TerminalLoadingUnloadingOfferDataResult,
    TerminalLoadingUnloadingOfferStoreDTO
} from "./interfaces";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import {
    TerminalLoadingUnloadingOfferDataQuery,
    TerminalLoadingUnloadingOfferResponseResult
} from "./TerminalLoadingUnloadingOfferDataQuery";
import {priceConditionsService} from "../priceConditionsService";
import {PriceConditionsServiceInterface} from "../priceConditionsService/interface";
import {AllowanceOfferServiceInterface} from "../allowanceService/interfaces";
import {allowanceOfferService} from "../allowanceService";
import {
    InsertTerminalLoadingUnloadingResponse,
    TerminalLoadingUnloadingInsertQuery
} from "./TerminalLoadingUnloadingInsertQuery";
import {
    TerminalLoadingUnloadingUpdateQuery,
    UpdateTerminalLoadingUnloadingResponse
} from "./TerminalLoadingUnloadingUpdateQuery";

/**
 * Загрузчик данных по условиям ПРР для услуг терминала
 */
export class TerminalLoadingUnloadingOfferData implements TerminalLoadingUnloadingOfferDataInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;
    private readonly offersLoader: PriceConditionsServiceInterface;
    private readonly allowanceLoader: AllowanceOfferServiceInterface;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.logger = loggerFactory().make(`TerminalLoadingUnloadingOfferData`);
        this.offersLoader = priceConditionsService(token);
        this.allowanceLoader = allowanceOfferService(token);
    }

    /**
     * Загрузка данных
     * @param offerIds
     */
    async Load(offerIds: any[]): Promise<TerminalLoadingUnloadingOfferDataResult[]> {
        if (0 === offerIds.length) {
            return [];
        }

        try {
            const response = await this.client.Query<null, TerminalLoadingUnloadingOfferResponseResult>(
                new TerminalLoadingUnloadingOfferDataQuery(offerIds),
                {},
            );
            this.logger.Debug(`Loaded response`, response);

            if (0 === response.result.length) {
                return [];
            }

            let offerIdsMap: any[] = [];
            let allowanceIds: any[] = [];
            response.result.map(item => {
                offerIdsMap.push(...item.offer_conditions);
                allowanceIds.push(...item.allowance_offers);
            });

            const offers = await this.offersLoader.GetConditions(offerIdsMap);
            const allowances = await this.allowanceLoader.GetAllowances(allowanceIds);

            return response.result.map(item => {
                return {
                    ...item,
                    offer_conditions: offers.filter(offer => item.offer_conditions.indexOf(`${offer.id}`) !== -1),
                    allowance_offers: allowances.filter(allowance => item.allowance_offers.indexOf(`${allowance.id}`) !== -1),
                }
            });
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }

    /**
     * Клонирование значений перед сохранением
     * @param entities
     */
    CloneEntities(entities: TerminalLoadingUnloadingOfferDataResult[]): TerminalLoadingUnloadingOfferDataResult[] {
        return JSON.parse(JSON.stringify(entities)).map((entity: TerminalLoadingUnloadingOfferDataResult) => {
            return {
                ...entity,
                id: null,
                offer_conditions: this.offersLoader.ProcessConditionsBeforeClone(entity.offer_conditions),
                allowance_offers: this.allowanceLoader.ProcessAllowancesBeforeClone(entity.allowance_offers)
            }
        });
    }

    /**
     * Сохранение условий ПРР
     * @param entities
     */
    async StoreEntities(entities: TerminalLoadingUnloadingOfferDataResult[]): Promise<TerminalLoadingUnloadingOfferStoreDTO[]> {
        if (0 === entities.length) {
            return [];
        }

        try {
            const entitiesDto = await Promise.all(
                entities.map(async (entity: TerminalLoadingUnloadingOfferDataResult) => {
                    const storedOfferConditions = await this.offersLoader.StoreConditions(entity.offer_conditions);
                    const storedAllowances = await this.allowanceLoader.StoreAllowances(entity.allowance_offers);

                    return <TerminalLoadingUnloadingOfferStoreDTO>{
                        ...entity,
                        offer_conditions: storedOfferConditions.map(o => o.id),
                        allowance_offers: storedAllowances,
                    }
                })
            );

            let entitiesToCreate: TerminalLoadingUnloadingOfferStoreDTO[] = [];
            let entitiesToUpdate: TerminalLoadingUnloadingOfferStoreDTO[] = [];

            entitiesDto.map(entity => {
                if (null !== entity.id) {
                    entitiesToUpdate.push(entity);
                } else {
                    entitiesToCreate.push(entity);
                }
            });

            const createdEntities = await this.CreateEntities(entitiesToCreate);
            const updatedEntities = await this.UpdateEntities(entitiesToUpdate);

            return [...updatedEntities, ...createdEntities]
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }

    /**
     * Создание сущностей условий ПРР
     * @param entities
     */
    async CreateEntities(entities: TerminalLoadingUnloadingOfferStoreDTO[]): Promise<TerminalLoadingUnloadingOfferStoreDTO[]> {
        if (0 === entities.length) {
            return []
        }

        const response = await this.client.Mutation<null, InsertTerminalLoadingUnloadingResponse>(
            new TerminalLoadingUnloadingInsertQuery(entities),
            {},
        );

        this.logger.Debug(`CreateEntities() - response`, response);

        return response.result.returning;
    }

    /**
     * Обновление сущностей условий ПРР
     * @param entities
     */
    async UpdateEntities(entities: TerminalLoadingUnloadingOfferStoreDTO[]): Promise<TerminalLoadingUnloadingOfferStoreDTO[]> {
        if (0 === entities.length) {
            return []
        }

        const promises = entities.map(async (entity: TerminalLoadingUnloadingOfferStoreDTO) => {
            const response = await this.client.Mutation<null, UpdateTerminalLoadingUnloadingResponse>(
                new TerminalLoadingUnloadingUpdateQuery(entity),
                {},
            );

            this.logger.Debug(`UpdateEntities() - response`, response);

            return response.result.returning;
        });

        let result: TerminalLoadingUnloadingOfferStoreDTO[] = [];
        (await Promise.all(promises)).map(item => {
            result = [...result, ...item]
        });

        return result;
    }
}