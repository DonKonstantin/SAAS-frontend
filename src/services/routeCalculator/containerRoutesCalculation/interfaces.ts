import {ContainerRouteCalculationParameters} from "../../../reduxStore/stores/RouteCalculationStore";
import {RouteResult} from "./types";

/**
 * Сервис расчета маршрутов контейнерной перевозки
 */
export interface ContainerRoutesCalculationServiceInterface {
    /**
     * Расчет списка маршрутов по переданным параметрам
     * @param parameters
     */
    CalculateRoutesByParameters(parameters: ContainerRouteCalculationParameters): Promise<RouteResult>
}