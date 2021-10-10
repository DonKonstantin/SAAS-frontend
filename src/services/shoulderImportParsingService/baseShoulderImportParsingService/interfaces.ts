import {
    Configurations,
    ImportParsingTypes
} from "../../shoulderImportTaskService/baseTypes";
import {Values} from "./fieldValueBySettingsParser/interfaces";
import {Subject} from "rxjs";

// Результат парсинга дочерних сущностей
export type ParsingResult<Entity extends object> = {
    values: Values<Entity>[]
}

// Результат выполнения обработки данных
export type ProcessingResult<Entity extends object> = {
    callback: { (): Promise<ParsingResult<Entity>> },
    complete: Subject<number>,
}

/**
 * Сервис базового парсинга данных импорта
 */
export interface BaseShoulderImportParsingServiceInterface<
    Entities extends object,
    Key extends keyof Entities,
    Entity extends object,
    ParsingType extends ImportParsingTypes,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
> {
    /**
     * Парсинг сырых данных для формирования базового списка плеч
     * @param data
     * @param parentRow
     * @param parentValues
     * @param configuration
     */
    parseData(
        data: { [K in string]: string[][] },
        parentRow: string[],
        parentValues: object,
        configuration: Configurations<Entities, Key, Entity, ParsingType, SubEntityConfig>,
    ): ProcessingResult<Entity>
}
