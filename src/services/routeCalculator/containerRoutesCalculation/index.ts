import {ContainerRoutesCalculationServiceInterface} from "./interfaces";
import {ContainerRoutesCalculationService} from "./ContainerRoutesCalculationService";

// Конструктор сервиса
export const containerRoutesCalculationService: {(token?: string): ContainerRoutesCalculationServiceInterface} = token => {
    return new ContainerRoutesCalculationService(token);
};