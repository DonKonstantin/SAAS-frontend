import {DensityConverterServiceInterface} from "./interfaces";
import {UnitData} from "../../searchLoaders/unitLoader/UnitLoaderQuery";

/**
 * Сервис конвертации плотности
 */
export class DensityConverterService implements DensityConverterServiceInterface {
    /**
     * Конвертация плотности в базовую плотность
     * @param density
     * @param densityUnitFrom
     * @param densityUnitTo
     */
    ConvertToBaseDensity(density: number, densityUnitFrom: UnitData, densityUnitTo: UnitData): number {
        return density * densityUnitFrom.convertation_coefficient / densityUnitTo.convertation_coefficient
    }

    /**
     * Конвертация плотности в настраиваемую плотность
     * @param density
     * @param densityUnitFrom
     * @param densityUnitTo
     * @param targetDensityUnitFrom
     * @param targetDensityUnitTo
     */
    ConvertToTargetDensity(
        density: number,
        densityUnitFrom: UnitData,
        densityUnitTo: UnitData,
        targetDensityUnitFrom: UnitData,
        targetDensityUnitTo: UnitData,
    ): number {
        return this.ConvertToBaseDensity(density, densityUnitFrom, densityUnitTo)
            / targetDensityUnitFrom.convertation_coefficient
            * targetDensityUnitTo.convertation_coefficient
    }
}