import {
    _ConvertValueBetweenUnitsProcessorInterface,
    ConvertationCoefficients,
    ConvertationConfiguration
} from "./interfaces";
import {UnitGroupData} from "../searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";
import {baseUnitConverterService} from "./baseUnitConvertationService";

export type TConvertFunction = {(sourceBaseValue: number, params: ConvertationCoefficients): number}
export type TCheckAvailable = {(params: ConvertationCoefficients): boolean}

/**
 * Базовый процессор конвертации значений между единицами измерения
 */
export class _ConvertationBaseProcessor implements _ConvertValueBetweenUnitsProcessorInterface {
    private readonly convertProcess: TConvertFunction;
    private readonly unitGroup: UnitGroupData;
    private readonly baseUnitConverter = baseUnitConverterService();
    private readonly checkAvailable: TCheckAvailable;

    /**
     * Конструктор базового процессора
     * @param targetUnitGroup
     * @param convertProcess
     * @param checkAvailable
     */
    constructor(
        targetUnitGroup: UnitGroupData,
        convertProcess: TConvertFunction,
        checkAvailable: TCheckAvailable,
    ) {
        this.unitGroup = targetUnitGroup;
        this.convertProcess = convertProcess;
        this.checkAvailable = checkAvailable
    }

    /**
     * Конвертация значения
     * @param params
     */
    convert(params: ConvertationCoefficients): number {
        const sourceBaseValue = this.baseUnitConverter.ConvertToBaseUnit(params.sourceUnit, params.value);
        let convertedBaseValue = this.convertProcess(sourceBaseValue, params);

        const accuracyCoefficient = Math.pow(10, this.unitGroup.accuracy);
        switch (this.unitGroup.rounding_rule) {
            case "large":
                convertedBaseValue = Math.ceil(convertedBaseValue * accuracyCoefficient) / accuracyCoefficient;
                break;
            case "lesser":
                convertedBaseValue = Math.floor(convertedBaseValue * accuracyCoefficient) / accuracyCoefficient;
                break;
            case "math":
                convertedBaseValue = Math.round(convertedBaseValue * accuracyCoefficient) / accuracyCoefficient;
                break
        }

        return this.baseUnitConverter.ConvertFromBaseUnit(params.targetUnit, convertedBaseValue)
    }

    /**
     * Проверка доступности процессора
     * @param params
     */
    isAvailable(params: ConvertationCoefficients): boolean {
        return this.checkAvailable(params);
    }

    /**
     * Получение настроек конвертации
     */
    getConfiguration(): ConvertationConfiguration {
        return new ConvertationConfiguration();
    }
}