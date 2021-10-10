import {ShoulderStepsServiceInterface} from "./interfaces";
import {ShoulderStepsService} from "./ShoulderStepsService";

// Фабрика сервиса
export const shoulderStepsService: {(token?: string): ShoulderStepsServiceInterface} = token => {
    return new ShoulderStepsService(token)
};