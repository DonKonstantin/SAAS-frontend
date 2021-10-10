import {
    Configurations,
    EntityParsingConfiguration,
    ImportParsingTypes
} from "../../../shoulderImportTaskService/baseTypes";
import {Values} from "../fieldValueBySettingsParser/interfaces";
import {Subject} from "rxjs";

// Результат парсинга сущностей
export type ParsingResult<
    Entity extends object
> = {
    values: Values<Entity>[]
}

// Результат выполнения обработки данных
export type ProcessingResult<Entity extends object> = {
    callback: { (): Promise<ParsingResult<Entity>> },
    complete: Subject<number>,
}

/**
 * Сервис парсинга сущностей по переданной конфигурации
 */
export interface EntityParserInterface<
    Entities extends object,
    Key extends keyof Entities,
    Entity extends object,
    ParsingType extends ImportParsingTypes,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
> {
    /**
     * Парсинг данных по переданным параметрам. Возвращает массив данных по сущностям
     * @param data
     * @param parentRow
     * @param parentValues
     * @param configuration
     */
    parseEntity(
        data: { [K in string]: string[][] },
        parentRow: string[],
        parentValues: object,
        configuration: EntityParsingConfiguration<Entities, Key, Entity, ParsingType, SubEntityConfig>,
    ): ProcessingResult<Entity>
}