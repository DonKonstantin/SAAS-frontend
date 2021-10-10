import {DataConverterProcessorInterface} from "./interfaces";
import {FieldConfiguration} from "../../../shoulderImportTaskService/baseTypes";
import {EntitySearchServiceInterface} from "../../../entitySearchService/interface";

/**
 * Процессор для обработки числовых отношений
 */
export class NumberRelationProcessor<T, field extends keyof T> implements DataConverterProcessorInterface<T, field> {
    private readonly entitySearchService: EntitySearchServiceInterface;

    /**
     * Конструктор сервиса
     * @param entitySearchService
     */
    constructor(entitySearchService: EntitySearchServiceInterface) {
        this.entitySearchService = entitySearchService;
    }

    /**
     * Проверка доступности процессора
     * @param configuration
     */
    isAvailable(configuration: FieldConfiguration<T, field>): boolean {
        return configuration.fieldValueType === "number" && !!configuration.relation;
    }

    /**
     * Конвертация данных
     * @param configuration
     * @param data
     */
    async convertData(configuration: FieldConfiguration<T, field>, data: string): Promise<any> {
        const {relation} = configuration;
        if (!relation) {
            throw new Error(`Отношение не задано`)
        }

        const {primaryKeyGetter} = relation;
        const [item] = await this.entitySearchService.phoneticSearch(data, relation);
        if (!item) {
            throw new Error(`Не найдено отношение для переданного значения: ${data}`)
        }

        return Number(`${primaryKeyGetter(item)}`);
    }
}