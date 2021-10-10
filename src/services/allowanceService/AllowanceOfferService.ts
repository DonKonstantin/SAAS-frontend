import {loggerFactory} from "../logger";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {AllowanceOffer, AllowanceOfferServiceInterface} from "./interfaces";
import {PriceConditionsServiceInterface} from "../priceConditionsService/interface";
import {priceConditionsService} from "../priceConditionsService";
import {AllowanceOfferLoadQuery, AllowanceOfferLoadQueryResponse} from "./AllowanceOfferLoadQuery";
import {AllowanceOfferInsertQuery, AllowanceOfferInsertQueryResponse} from "./AllowanceOfferInsertQuery";
import {AllowanceOfferUpdateQuery, AllowanceOfferUpdateQueryResponse} from "./AllowanceOfferUpdateQuery";
import {Allowance, AllowanceTypeServiceInterface} from "../allowanceTypeService/interfaces";
import {allowanceTypeService} from "../allowanceTypeService";

/**
 * Сервис работы с надбавками
 */
export class AllowanceOfferService implements AllowanceOfferServiceInterface {
    private readonly logger = loggerFactory().make(`AllowanceOfferService`);
    private readonly client: GraphQLClient;
    private readonly priceConditionsService: PriceConditionsServiceInterface;
    private readonly allowanceTypeService: AllowanceTypeServiceInterface;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.priceConditionsService = priceConditionsService(token);
        this.allowanceTypeService = allowanceTypeService(token)
    }

    /**
     * Получение списка
     * @param ids
     */
    async GetAllowances(ids: any[]): Promise<AllowanceOffer[]> {
        try {
            if (0 === ids.length) {
                return []
            }

            const response = await this.client.Query<null, AllowanceOfferLoadQueryResponse>(new AllowanceOfferLoadQuery(ids), {});
            this.logger.Debug(`GetAllowances() - Loaded allowance offers`, response);

            if (!response) {
                return []
            }

            let allowanceIds: any[] = [];
            let priceConditionIds: any[] = [];
            response.items.map(item => {
                allowanceIds.push(item.allowance_id);
                priceConditionIds.push(...item.offer_conditions)
            });

            const priceConditions = await this.priceConditionsService.GetConditions(priceConditionIds);
            const allowances: Allowance[] = await this.allowanceTypeService.GetAllowances(allowanceIds);

            let result: AllowanceOffer[] = response.items.map(item => {
                return <AllowanceOffer>{
                    id: item.id,
                    allowance: allowances.find(a => a.id === item.allowance_id) as Allowance,
                    isInvoiceAllowance: item.is_invoice_allowance,
                    offerConditions: priceConditions.filter(c => item.offer_conditions.indexOf(c.id as string) !== -1),
                }
            });

            this.logger.Debug(`GetConditions() - Parsed allowance offers`, result);

            return result
        } catch (e) {
            this.logger.Error(`GetConditions() - Some error occurred`, e);
            return []
        }
    }

    /**
     * Предварительная обработка надбавок перед клонированием
     * @param allowanceOffers
     */
    ProcessAllowancesBeforeClone(allowanceOffers: AllowanceOffer[]): AllowanceOffer[] {
        return (JSON.parse(JSON.stringify(allowanceOffers)) as AllowanceOffer[]).map(offer => {
            return {
                ...offer,
                id: null,
                offerConditions: this.priceConditionsService.ProcessConditionsBeforeClone(offer.offerConditions),
            }
        })
    }

    /**
     * Обработка сохранения надбавок
     * @param allowanceOffers
     */
    async StoreAllowances(allowanceOffers: AllowanceOffer[]): Promise<any[]> {
        const offersToInsert: AllowanceOffer[] = [];
        const offersToUpdate: AllowanceOffer[] = [];

        allowanceOffers.map(offer => {
            if (offer.id) {
                offersToUpdate.push(offer)
            } else {
                offersToInsert.push(offer)
            }
        });

        let promises: Promise<any[]>[] = [...offersToUpdate.map(condition => this.UpdateOffer(condition))];
        promises = [...promises, this.InsertOffers(offersToInsert)];

        const response = await Promise.all(promises);
        const result = response.reduce((result: any[], item: any[]): any[] => {
            return [...result, ...item]
        }, []);

        this.logger.Debug(`StoreAllowances() - Saved allowance offers`, result);

        return result
    }

    /**
     * Вставка новых надбавок
     * @param allowanceOffers
     */
    async InsertOffers(allowanceOffers: AllowanceOffer[]): Promise<any[]> {
        try {
            if (0 === allowanceOffers.length) {
                return []
            }

            await Promise.all(allowanceOffers.map(async offer => {
                offer.offerConditions = await this.priceConditionsService.StoreConditions(offer.offerConditions)
            }));

            const response = await this.client.Mutation<null, AllowanceOfferInsertQueryResponse>(new AllowanceOfferInsertQuery(allowanceOffers), {});
            this.logger.Debug(`InsertOffers() - Saved offers`, response);

            if (!response) {
                return []
            }

            return response.insert.items.reduce((result: any[], item: {id: string}): any[] => [...result, item.id], [])
        } catch (e) {
            this.logger.Error(`InsertOffers() - Some error occurred`, e);
            return []
        }
    }

    /**
     * Обновление надбавок
     * @param allowanceOffer
     */
    async UpdateOffer(allowanceOffer: AllowanceOffer): Promise<any[]> {
        try {
            allowanceOffer.offerConditions = await this.priceConditionsService.StoreConditions(allowanceOffer.offerConditions);

            const response = await this.client.Mutation<null, AllowanceOfferUpdateQueryResponse>(new AllowanceOfferUpdateQuery(allowanceOffer), {});
            this.logger.Debug(`UpdateOffer() - Saved offers`, response);

            if (!response) {
                return []
            }

            return response.update.items.reduce((result: any[], item: {id: string}): any[] => [...result, item.id], [])
        } catch (e) {
            this.logger.Error(`UpdateOffer() - Some error occurred`, e);
            return []
        }
    }
}