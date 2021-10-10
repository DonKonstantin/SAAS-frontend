import {PriceCondition, PriceConditionsServiceInterface} from "./interface";
import {loggerFactory} from "../logger";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {PriceConditionLoaderQuery, PriceConditionLoaderQueryResponse} from "./PriceConditionLoaderQuery";
import {ConvertPriceConditionFromGraphQL} from "./PriceConditionGraphQLProcessor";
import {PriceConditionUpdateQuery, PriceConditionUpdateQueryResponse} from "./PriceConditionUpdateQuery";
import {PriceConditionInsertQuery, PriceConditionInsertQueryResponse} from "./PriceConditionInsertQuery";

/**
 * Сервис для работы с ценовыми предложениями
 */
export class PriceConditionsService implements PriceConditionsServiceInterface {
    private readonly logger = loggerFactory().make(`PriceConditionsService`);
    private readonly client: GraphQLClient;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    /**
     * Получение списка
     * @param ids
     */
    async GetConditions(ids: any[]): Promise<PriceCondition[]> {
        try {
            if (0 === ids.length) {
                return []
            }

            const response = await this.client.Query<null, PriceConditionLoaderQueryResponse>(new PriceConditionLoaderQuery(ids), {});
            this.logger.Debug(`GetConditions() - Loaded price conditions`, response);

            if (!response) {
                return []
            }

            return response.items.map(ConvertPriceConditionFromGraphQL)
        } catch (e) {
            this.logger.Error(`GetConditions() - Some error occurred`, e);
            return []
        }
    }

    /**
     * Предварительная обработка условий ценовых предложений перед клонированием
     * @param conditions
     */
    ProcessConditionsBeforeClone(conditions: PriceCondition[]): PriceCondition[] {
        return conditions.map(c => ({
            ...c,
            id: null
        }));
    }

    /**
     * Обработка сохранения условий ценовых предложений
     * @param conditions
     */
    async StoreConditions(conditions: PriceCondition[]): Promise<PriceCondition[]> {
        const conditionsToInsert: PriceCondition[] = [];
        const conditionsToUpdate: PriceCondition[] = [];

        conditions.map(condition => {
            if (condition.id) {
                conditionsToUpdate.push(condition)
            } else {
                conditionsToInsert.push(condition)
            }
        });

        let promises: Promise<PriceCondition[]>[] = [...conditionsToUpdate.map(condition => this.UpdateCondition(condition))];
        promises = [...promises, this.InsertConditions(conditionsToInsert)];

        const response = await Promise.all(promises);
        const result = response.reduce((result: PriceCondition[], item: PriceCondition[]): PriceCondition[] => {
            return [...result, ...item]
        }, []);

        this.logger.Debug(`StoreConditions() - Saved price conditions`, result);

        return result
    }

    /**
     * Вставка новых условий ценовых предложений
     * @param conditions
     */
    async InsertConditions(conditions: PriceCondition[]): Promise<PriceCondition[]> {
        try {
            if (0 === conditions.length) {
                return []
            }

            const response = await this.client.Mutation<null, PriceConditionInsertQueryResponse>(new PriceConditionInsertQuery(conditions), {});
            this.logger.Debug(`InsertConditions() - Saved price conditions`, response);

            if (!response) {
                return []
            }

            return response.insert.items.map(ConvertPriceConditionFromGraphQL)
        } catch (e) {
            this.logger.Error(`InsertConditions() - Some error occurred`, e);
            return []
        }
    }

    /**
     * Обновление единичного условия ценового предложения
     * @param condition
     */
    async UpdateCondition(condition: PriceCondition): Promise<PriceCondition[]> {
        try {
            const response = await this.client.Mutation<null, PriceConditionUpdateQueryResponse>(new PriceConditionUpdateQuery(condition), {});
            this.logger.Debug(`UpdateCondition() - Saved price conditions`, response);

            if (!response) {
                return []
            }

            return response.update.items.map(ConvertPriceConditionFromGraphQL)
        } catch (e) {
            this.logger.Error(`UpdateCondition() - Some error occurred`, e);
            return []
        }
    }
}