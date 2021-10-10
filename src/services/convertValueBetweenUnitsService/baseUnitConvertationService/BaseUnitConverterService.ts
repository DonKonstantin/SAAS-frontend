import {BaseUnitConverterServiceInterface} from "./interfaces";
import {UnitData} from "../../searchLoaders/unitLoader/UnitLoaderQuery";

/**
 * Сервис конвертации значений в базовые единицы измерения
 */
export class BaseUnitConverterService implements BaseUnitConverterServiceInterface {
    private readonly palletUnitGroup: string = `4`;

    /**
     * Конвертация из базовой единицы измерения
     * @param unit
     * @param value
     */
    ConvertFromBaseUnit(unit: UnitData, value: number): number {
        if (unit.unit_group === this.palletUnitGroup) {
            return value
        }

        let baseValue = value / unit.convertation_coefficient
        const accuracyCoefficient = Math.pow(10, unit.accuracy_in)
        switch (unit.rounding_rule_in) {
            case "large":
                baseValue = Math.ceil(baseValue * accuracyCoefficient) / accuracyCoefficient
                break
            case "lesser":
                baseValue = Math.floor(baseValue * accuracyCoefficient) / accuracyCoefficient
                break
            case "math":
                baseValue = Math.round(baseValue * accuracyCoefficient) / accuracyCoefficient
                break
        }

        return baseValue;
    }

    /**
     * Конвертация в базовую единицу измерения
     * @param unit
     * @param value
     */
    ConvertToBaseUnit(unit: UnitData, value: number): number {
        if (unit.unit_group === this.palletUnitGroup) {
            return value
        }

        let baseValue = value * unit.convertation_coefficient
        const accuracyCoefficient = Math.pow(10, unit.accuracy_out)
        switch (unit.rounding_rule_out) {
            case "large":
                baseValue = Math.ceil(baseValue * accuracyCoefficient) / accuracyCoefficient
                break
            case "lesser":
                baseValue = Math.floor(baseValue * accuracyCoefficient) / accuracyCoefficient
                break
            case "math":
                baseValue = Math.round(baseValue * accuracyCoefficient) / accuracyCoefficient
                break
        }

        return baseValue;
    }
}