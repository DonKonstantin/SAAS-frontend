import {DensityConverterServiceInterface} from "./interfaces";
import {DensityConverterService} from "./DensityConverterService";

/**
 * Фабрика сервиса
 */
export const densityConverterService: {(): DensityConverterServiceInterface} = () => (
    new DensityConverterService()
)