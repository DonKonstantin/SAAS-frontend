import {ContainerRoutesCalculationServiceInterface,} from "./interfaces";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {graphQLClient} from "../../graphQLClient";
import {
    ContainerRoutesCalculationQuery,
    ContainerRoutesCalculationQueryResponse
} from "./ContainerRoutesCalculationQuery";
import {ContainerRouteCalculationParameters} from "../../../reduxStore/stores/RouteCalculationStore";
import {RouteResult} from "./types";
import {Logger} from "../../logger/Logger";
import {loggerFactory} from "../../logger";

/**
 * Сервис расчета маршрутов контейнерной перевозки
 */
export class ContainerRoutesCalculationService implements ContainerRoutesCalculationServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.logger = loggerFactory().make(`ContainerRoutesCalculationService`);
    }

    /**
     * Расчет списка маршрутов по переданным параметрам
     * @param parameters
     */
    async CalculateRoutesByParameters(parameters: ContainerRouteCalculationParameters): Promise<RouteResult> {
        try {
            const resp = await this.client.Query<null, ContainerRoutesCalculationQueryResponse>(new ContainerRoutesCalculationQuery(parameters), {});
            const baseResult = resp.calculateContainerRoutes;

            this.logger.Debug(`Loaded base routes`, baseResult);

            return {
                ...baseResult,
            }
        } catch {
            return {
                cargoParameters: null,
                computeLog: [],
                routes: [],
            } as RouteResult
        }
    }
}