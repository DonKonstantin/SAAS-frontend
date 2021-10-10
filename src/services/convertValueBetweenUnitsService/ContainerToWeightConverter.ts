import {
    _ConvertValueBetweenUnitsProcessorInterface,
    ConvertationCoefficients,
    ConvertationConfiguration
} from "./interfaces";
import {UnitGroupData} from "../searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";
import {_ConvertationBaseProcessor} from "./_convertationBaseProcessor";
import {densityConverterService} from "./densityConverterService";

export class ContainerToWeightConverter implements _ConvertValueBetweenUnitsProcessorInterface {
    private readonly baseValueProcessor: _ConvertationBaseProcessor;
    private readonly densityConverter = densityConverterService();

    /**
     * Конструктор сервиса
     * @param unitGroups
     */
    constructor(unitGroups: UnitGroupData[]) {
        this.baseValueProcessor = new _ConvertationBaseProcessor(
            unitGroups.find(g => g.id === "1") as UnitGroupData,
            (sourceBaseValue, params) => sourceBaseValue * this.densityConverter.ConvertToBaseDensity(params.density, params.densityUnitFrom, params.densityUnitTo),
            params => params.sourceUnit.unit_group === "6" && params.targetUnit.unit_group === "1",
        )
    }

    /**
     * Конвертация значения
     * @param params
     */
    convert(params: ConvertationCoefficients): number {
        return this.baseValueProcessor.convert(params);
    }

    /**
     * Проверка доступности процессора
     * @param params
     */
    isAvailable(params: ConvertationCoefficients): boolean {
        return this.baseValueProcessor.isAvailable(params);
    }

    /**
     * Получение настроек конвертации
     */
    getConfiguration(): ConvertationConfiguration {
        return {
            ...new ConvertationConfiguration(),
            isDensityRequired: true,
            densityFromUnitGroup: "1",
            densityToUnitGroup: "6",
        }
    }
}