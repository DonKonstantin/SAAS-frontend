import {
    _ConvertValueBetweenUnitsProcessorInterface,
    ConvertationCoefficients,
    ConvertationConfiguration
} from "./interfaces";
import {_ConvertationBaseProcessor} from "./_convertationBaseProcessor";
import {UnitGroupData} from "../searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";

export class WeightToWeightContainerConverter implements _ConvertValueBetweenUnitsProcessorInterface {
    private readonly baseValueProcessor: _ConvertationBaseProcessor;

    /**
     * Конструктор сервиса
     * @param unitGroups
     */
    constructor(unitGroups: UnitGroupData[]) {
        this.baseValueProcessor = new _ConvertationBaseProcessor(
            unitGroups.find(g => g.id === "7") as UnitGroupData,
            (sourceBaseValue) => sourceBaseValue,
            params => params.sourceUnit.unit_group === "1" && params.targetUnit.unit_group === "7",
        )
    }

    convert(params: ConvertationCoefficients): number {
        return this.baseValueProcessor.convert(params);
    }

    getConfiguration(): ConvertationConfiguration {
        return {
            ...new ConvertationConfiguration(),
            isDensityRequired: false,
        }
    }

    isAvailable(params: ConvertationCoefficients): boolean {
        return this.baseValueProcessor.isAvailable(params);
    }
}