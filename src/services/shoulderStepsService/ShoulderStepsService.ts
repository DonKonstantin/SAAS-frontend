import {ShoulderStepsServiceInterface} from "./interfaces";
import {ShoulderStepData} from "../searchLoaders/shoulderStepsLoader/ShoulderStepsLoaderQuery";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger} from "../logger/Logger";
import {InsertShoulderStepsDataResponse, ShoulderStepDataInsertQuery} from "./ShoulderStepsDataInsertQuery";
import {ShoulderStepDataUpdateQuery, UpdateShoulderStepDataResponse} from "./ShoulderStepDataUpdateQuery";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";

/**
 * Сервис настройки шагов плеча
 */
export class ShoulderStepsService implements ShoulderStepsServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.logger = loggerFactory().make(`ShoulderStepsService`);
    }

    /**
     * Клонирование шагов плеча
     * @param steps
     */
    CloneShoulderSteps(steps: ShoulderStepData[]): ShoulderStepData[] {
        return steps.map(step => ({
            ...step,
            id: null,
        }));
    }

    /**
     * Обработка сохранения шагов плеча
     * @param steps
     */
    async StoreShoulderSteps(steps: ShoulderStepData[]): Promise<ShoulderStepData[]> {
        let stepsToCreate = [] as ShoulderStepData[];
        let stepsToUpdate = [] as ShoulderStepData[];

        steps.map(step => {
            if (step.id === null) {
                stepsToCreate.push(step);
                return;
            }

            stepsToUpdate.push(step);
        });

        return (await Promise.all([
            this.createShoulderSteps(stepsToCreate),
            this.updateShoulderSteps(stepsToUpdate),
        ])).reduce((result, items) => {
            return [
                ...result,
                ...items,
            ];
        }, [] as ShoulderStepData[]);
    }

    /**
     * Создание новых шагов
     * @param steps
     */
    private async createShoulderSteps(steps: ShoulderStepData[]): Promise<ShoulderStepData[]> {
        if (0 === steps.length) {
            return []
        }

        const response = await this.client.Mutation<null, InsertShoulderStepsDataResponse>(
            new ShoulderStepDataInsertQuery(steps),
            {},
        );

        this.logger.Debug(`createShoulderSteps() - response`, response);

        return response.result.returning;
    }

    /**
     * Обновление шагов
     * @param steps
     */
    private async updateShoulderSteps(steps: ShoulderStepData[]): Promise<ShoulderStepData[]> {
        if (0 === steps.length) {
            return []
        }

        const promises = steps.map(async step => {
            const response = await this.client.Mutation<null, UpdateShoulderStepDataResponse>(
                new ShoulderStepDataUpdateQuery(step),
                {},
            );

            this.logger.Debug(`updateShoulderSteps() - response`, response);

            return response.result.returning;
        });

        return (await Promise.all(promises)).reduce((result, items) => {
            return [
                ...result,
                ...items,
            ]
        }, [] as ShoulderStepData[])
    }
}