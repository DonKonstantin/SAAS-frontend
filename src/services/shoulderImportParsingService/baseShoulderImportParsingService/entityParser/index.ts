import {EntityParserInterface} from "./interface";
import {
    Configurations,
    FieldConfigurationCollection,
    ImportParsingTypes
} from "../../../shoulderImportTaskService/baseTypes";
import {EntityParser} from "./EntityParser";
import {rowDataGetter} from "../rowDataGetter";
import {fieldValueBySettingsParser} from "../fieldValueBySettingsParser";
import {SubConfigurationParserPair} from "../subConfigurationParser/SubConfigurationParser";
import {subConfigurationParser} from "../subConfigurationParser";

// Фабрика сервиса
export const entityParser: {
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
    ): EntityParserInterface<Entities, Key, Entity, ParsingType, SubEntityConfig>
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
    return new EntityParser<Entities, Key, Entity, ParsingType, SubEntityConfig>(
        rowDataGetter(parentIdFieldKey),
        fieldValueBySettingsParser(),
        subConfigurationParser(...subConfigurators),
        fieldsConfigurationGetter,
    )
};