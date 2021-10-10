import {CustomCargoRoutesCalculationServiceInterface} from "./interfaces";
import {CustomCargoRouteCalculationParameters} from "../../../reduxStore/stores/RouteCalculationStore";
import {CustomCargoRouteResult} from "./types";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger} from "../../logger/Logger";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";
import {
    CustomCargoRoutesCalculationQuery,
    CustomCargoRoutesCalculationQueryResponse
} from "./CustomCargoRoutesCalculationQuery";

/**
 * Сервис расчета маршрутов перевозки сборного груза
 */
export class CustomCargoRoutesCalculationService implements CustomCargoRoutesCalculationServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.logger = loggerFactory().make(`CustomCargoRoutesCalculationService`);
    }

    /**
     * Расчет списка маршрутов по переданным параметрам
     * @param parameters
     */
    async CalculateRoutesByParameters(parameters: CustomCargoRouteCalculationParameters): Promise<CustomCargoRouteResult> {
        try {
            const resp = await this.client.Query<null, CustomCargoRoutesCalculationQueryResponse>(new CustomCargoRoutesCalculationQuery(parameters), {});
            const baseResult = resp.calculateCustomCargoRoutes;

            this.logger.Debug(`Loaded base routes`, baseResult);

            return {
                ...baseResult,
            }
        } catch {
            return {
                cargoParameters: null,
                computeLog: [],
                routes: [],
            } as CustomCargoRouteResult
        }
    }
}