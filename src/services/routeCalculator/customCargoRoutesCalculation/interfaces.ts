import {
    CustomCargoRouteCalculationParameters
} from "../../../reduxStore/stores/RouteCalculationStore";
import {CustomCargoRouteResult} from "./types";

/**
 * Сервис расчета маршрутов перевозки сборного груза
 */
export interface CustomCargoRoutesCalculationServiceInterface {
    /**
     * Расчет списка маршрутов по переданным параметрам
     * @param parameters
     */
    CalculateRoutesByParameters(parameters: CustomCargoRouteCalculationParameters): Promise<CustomCargoRouteResult>
}