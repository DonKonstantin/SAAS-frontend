import {UnitData} from "../searchLoaders/unitLoader/UnitLoaderQuery";
import {UnitGroupData} from "../searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";

// Параметры конвертации единицы измерения
export class ConvertationCoefficients {
    density: number = 0;
    densityUnitFrom: UnitData;
    densityUnitTo: UnitData;
    normativeHeightOfStacking: number = 2;
    length: number = 0;
    width: number = 0;
    value: number = 0;
    sourceUnitGroup: UnitGroupData;
    sourceUnit: UnitData;
    targetUnit: UnitData;
    fillConditions: boolean = true;
    fillPrices: boolean = true
}

// Настройки конвертации
export class ConvertationConfiguration {
    isDensityRequired: boolean = false;
    isNormativeHeightOfStackingRequired: boolean = false;
    isLengthRequired: boolean = false;
    isWidthRequired: boolean = false;
    densityFromUnitGroup: string = '';
    densityToUnitGroup: string = ''
}

/**
 * Конвертер значений между единицами измерения
 */
export interface ConvertValueBetweenUnitsServiceInterface {
    /**
     * Конвертация значений из одной единицы в другую
     * @param params
     */
    Convert(params: ConvertationCoefficients): number

    /**
     * Получение настроек конвертации
     */
    GetConfiguration(params: ConvertationCoefficients): ConvertationConfiguration
}

/**
 * Процессор для обработки конвертации значений
 */
export interface _ConvertValueBetweenUnitsProcessorInterface {
    /**
     * Проверка доступности процессора
     * @param params
     */
    isAvailable(params: ConvertationCoefficients): boolean

    /**
     * Конвертация значения
     * @param params
     */
    convert(params: ConvertationCoefficients): number

    /**
     * Получение настроек конвертации
     */
    getConfiguration(): ConvertationConfiguration
}