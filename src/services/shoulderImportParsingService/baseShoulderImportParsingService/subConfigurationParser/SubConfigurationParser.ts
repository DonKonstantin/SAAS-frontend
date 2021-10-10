import {ParsingResult, SubConfigurationParserInterface} from "./interfaces";
import {Configurations, ImportParsingTypes} from "../../../shoulderImportTaskService/baseTypes";
import {BaseShoulderImportParsingServiceInterface} from "../interfaces";
import {Values} from "../fieldValueBySettingsParser/interfaces";

export type SubConfigurationParserPair<
    Parent extends object,
    ParentField extends keyof Parent,
    Entities extends object,
    Key extends keyof Entities,
    Entity extends object,
    ParsingType extends ImportParsingTypes,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
> = {
    field: ParentField
    subConfig: Key
    parser: BaseShoulderImportParsingServiceInterface<Entities, Key, Entity, ParsingType, SubEntityConfig>
}

/**
 * Сервис парсинга данных дочерних сущностей
 */
export class SubConfigurationParser<
    Entities extends object,
    Entity extends object,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
> implements SubConfigurationParserInterface<Entities, Entity, SubEntityConfig> {
    private readonly subConfigurators: SubConfigurationParserPair<
        Entity,
        keyof Entity,
        Entities,
        any,
        any,
        any,
        any
    >[] = [];

    /**
     * Конструктор сервиса
     * @param subConfigurators
     */
    constructor(...subConfigurators: SubConfigurationParserPair<
        Entity,
        keyof Entity,
        Entities,
        any,
        any,
        any,
        any
    >[]) {
        this.subConfigurators = subConfigurators;
    }

    /**
     * Парсинг переданных данных по конфигурации полей
     * @param data
     * @param parentRawData
     * @param baseValues
     * @param config
     */
    async parse(
        data: { [K in string]: string[][] },
        parentRawData: string[],
        baseValues: Values<Entity>,
        config: SubEntityConfig,
    ): Promise<ParsingResult<Entity>> {
        const subEntities = Object.keys(config) as (keyof Entities)[];
        if (0 === subEntities.length) {
            return {
                values: {} as unknown as Values<Entity>,
            }
        }

        const result: ParsingResult<Entity> = {
            values: {} as unknown as Values<Entity>,
        };

        for (let entityKey of subEntities) {
            const configurator = this.subConfigurators.find(c => c.subConfig === entityKey);
            if (!configurator) {
                continue
            }

            const {callback} = configurator.parser.parseData(
                data,
                parentRawData,
                baseValues,
                config[entityKey] as Configurations<Entities, any, any, any, any>,
            );

            const subEntitiesParsingResult = await callback();
            result.values[configurator.field] = {
                value: subEntitiesParsingResult.values
            };
        }

        return result
    }
}