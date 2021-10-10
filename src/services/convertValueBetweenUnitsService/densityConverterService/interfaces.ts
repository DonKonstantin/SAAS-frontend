import {UnitData} from "../../searchLoaders/unitLoader/UnitLoaderQuery";

/**
 * Сервис конвертации плотности
 */
export interface DensityConverterServiceInterface {
    /**
     * Конвертация плотности в базовую плотность
     * @param density
     * @param densityUnitFrom
     * @param densityUnitTo
     */
    ConvertToBaseDensity(density: number, densityUnitFrom: UnitData, densityUnitTo: UnitData): number

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
    ): number
}