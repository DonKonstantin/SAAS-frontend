import {CustomCargoRoutesCalculationServiceInterface} from "./interfaces";
import {CustomCargoRoutesCalculationService} from "./CustomCargoRoutesCalculationService";

// Конструктор сервиса
export const customCargoRoutesCalculationService: {(token?: string): CustomCargoRoutesCalculationServiceInterface} = token => {
    return new CustomCargoRoutesCalculationService(token);
};