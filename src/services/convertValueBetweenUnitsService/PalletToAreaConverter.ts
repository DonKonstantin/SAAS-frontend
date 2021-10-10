import {
    _ConvertValueBetweenUnitsProcessorInterface,
    ConvertationCoefficients,
    ConvertationConfiguration
} from "./interfaces";
import {UnitGroupData} from "../searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";
import {_ConvertationBaseProcessor} from "./_convertationBaseProcessor";

export class PalletToAreaConverter implements _ConvertValueBetweenUnitsProcessorInterface {
    private readonly baseValueProcessor: _ConvertationBaseProcessor

    /**
     * Конструктор сервиса
     * @param unitGroups
     */
    constructor(unitGroups: UnitGroupData[]) {
        this.baseValueProcessor = new _ConvertationBaseProcessor(
            unitGroups.find(g => g.id === "3") as UnitGroupData,
            (sourceBaseValue, params) => sourceBaseValue * params.length * params.width,
            params => params.sourceUnit.unit_group === "4" && params.targetUnit.unit_group === "3",
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
            isWidthRequired: true,
            isLengthRequired: true,
        }
    }
}