import {SubConfigurationParserInterface} from "./interfaces";
import {SubConfigurationParser, SubConfigurationParserPair} from "./SubConfigurationParser";
import {Configurations, ImportParsingTypes} from "../../../shoulderImportTaskService/baseTypes";

// Фабрика сервиса
export const subConfigurationParser: {
    <
        Entities extends object,
        Entity extends object,
        SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
    >(...subConfigurators: SubConfigurationParserPair<
        Entity,
        keyof Entity,
        Entities,
        any,
        any,
        any,
        any
    >[]): SubConfigurationParserInterface<Entities, Entity, SubEntityConfig>
} = (...subConfigurators) => {
    return new SubConfigurationParser(
        ...subConfigurators
    )
};