import {BaseShoulderImportParsingServiceInterface} from "./interfaces";
import {
    Configurations,
    FieldConfigurationCollection,
    ImportParsingTypes
} from "../../shoulderImportTaskService/baseTypes";
import {SubConfigurationParserPair} from "./subConfigurationParser/SubConfigurationParser";
import {BaseShoulderImportParsingService} from "./BaseShoulderImportParsingService";
import {entityParser} from "./entityParser";

// Фабрика сервиса
export const baseShoulderImportParsingService: {
    <
        Entities extends object,
        Key extends keyof Entities,
        Entity extends object,
        ParsingType extends ImportParsingTypes,
        SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
    >(
        parentIdFieldKey: string,
        fieldsConfigurationGetter: {(): FieldConfigurationCollection<Entity>},
        ...subConfigurators: SubConfigurationParserPair<
            Entity,
            keyof Entity,
            Entities,
            any,
            any,
            any,
            any
        >[]
    ): BaseShoulderImportParsingServiceInterface<Entities, Key, Entity, ParsingType, SubEntityConfig>
} = <
    Entities extends object,
    Key extends keyof Entities,
    Entity extends object,
    ParsingType extends ImportParsingTypes,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
    >(
    parentIdFieldKey: string,
    fieldsConfigurationGetter: {(): FieldConfigurationCollection<Entity>},
    ...subConfigurators: SubConfigurationParserPair<
        Entity,
        keyof Entity,
        Entities,
        any,
        any,
        any,
        any
        >[]
) => {
    return new BaseShoulderImportParsingService<Entities, Key, Entity, ParsingType, SubEntityConfig>(
        entityParser(parentIdFieldKey, fieldsConfigurationGetter, ...subConfigurators)
    )
};