import {BaseUnitConverterServiceInterface} from "./interfaces";
import {BaseUnitConverterService} from "./BaseUnitConverterService";

/**
 * Фабрика сервиса
 */
export const baseUnitConverterService: {(): BaseUnitConverterServiceInterface} = () => {
    return new BaseUnitConverterService()
}