import {UnitData} from "../../searchLoaders/unitLoader/UnitLoaderQuery";

/**
 * Интерфейс сервиса конвертации значений в базовые единицы измерения
 */
export interface BaseUnitConverterServiceInterface {
    /**
     * Конвертация в базовую единицу измерения
     * @param unit
     * @param value
     */
    ConvertToBaseUnit(unit: UnitData, value: number): number

    /**
     * Конвертация из базовой единицы измерения
     * @param unit
     * @param value
     */
    ConvertFromBaseUnit(unit: UnitData, value: number): number
}