import {Values} from "../fieldValueBySettingsParser/interfaces";
import {Configurations, ImportParsingTypes} from "../../../shoulderImportTaskService/baseTypes";

// Результат парсинга дочерних сущностей
export type ParsingResult<
    Entity extends object
> = {
    values: Values<Entity>
}

/**
 * Сервис парсинга данных дочерних сущностей
 */
export interface SubConfigurationParserInterface<
    Entities extends object,
    Entity extends object,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
> {
    /**
     * Парсинг переданных данных по конфигурации полей
     * @param data
     * @param parentRawData
     * @param baseValues
     * @param config
     */
    parse(
        data: { [K in string]: string[][] },
        parentRawData: string[],
        baseValues: Values<Entity>,
        config: SubEntityConfig,
    ): Promise<ParsingResult<Entity>>
}