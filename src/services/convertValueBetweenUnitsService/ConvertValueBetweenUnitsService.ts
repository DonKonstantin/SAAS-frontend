import {
    _ConvertValueBetweenUnitsProcessorInterface,
    ConvertationCoefficients, ConvertationConfiguration,
    ConvertValueBetweenUnitsServiceInterface
} from "./interfaces";

/**
 * Конвертер значений между единицами измерения
 */
export class ConvertValueBetweenUnitsService implements ConvertValueBetweenUnitsServiceInterface {
    private readonly processors: _ConvertValueBetweenUnitsProcessorInterface[]

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(processors: _ConvertValueBetweenUnitsProcessorInterface[]) {
        this.processors = processors
    }

    /**
     * Конвертация значений из одной единицы в другую
     * @param params
     */
    Convert(params: ConvertationCoefficients): number {
        const processor = this.processors.find(p => p.isAvailable(params))
        if (!processor) {
            return 0
        }

        return processor.convert(params);
    }

    /**
     * Получение настроек конвертации
     */
    GetConfiguration(params: ConvertationCoefficients): ConvertationConfiguration {
        const processor = this.processors.find(p => p.isAvailable(params))
        if (!processor) {
            return new ConvertationConfiguration()
        }

        return processor.getConfiguration();
    }
}