import {
    AllowanceOffer,
    AllowanceOfferConfiguration,
    DefaultAllowanceOfferSettings,
    DefaultShoulderOfferConditionSettings, DefaultShoulderOfferSettings, DefaultShoulderSettings,
    DefaultShoulderStepSettings, Shoulder,
    ShoulderConfiguration, ShoulderOffer, ShoulderOfferCondition,
    ShoulderOfferConditionConfiguration,
    ShoulderOfferConfiguration, ShoulderStep,
    ShoulderStepConfiguration
} from "./shoulderTypes";
import {
    AvailableParsingTypes,
    Configurations,
    EntityParsingConfiguration, FieldConfigurationCollection,
    ImportParsingTypes, Settings
} from "./baseTypes";
import {v4} from "uuid";

// Полный комплект конфигурации полей для импортируемых плеч
export class ShoulderFieldConfiguration {
    shoulder: ShoulderConfiguration = new ShoulderConfiguration();
    shoulderStep: ShoulderStepConfiguration = new ShoulderStepConfiguration();
    shoulderOffer: ShoulderOfferConfiguration = new ShoulderOfferConfiguration();
    shoulderOfferCondition: ShoulderOfferConditionConfiguration = new ShoulderOfferConditionConfiguration();
    allowanceOffer: AllowanceOfferConfiguration = new AllowanceOfferConfiguration();
}

// Доступные для выбора типы источников данных для сущностей плеча
export class ShoulderImportAvailableParsingTypes implements AvailableParsingTypes<ShoulderFieldConfiguration> {
    allowanceOffer: ImportParsingTypes[] = ["partOfParentRow", "rowInSheetWithRelation", "fixedValue"];
    shoulder: ImportParsingTypes[] = ["rowInSheet", "fixedValue"];
    shoulderOffer: ImportParsingTypes[] = ["partOfParentRow", "rowInSheetWithRelation", "fixedValue"];
    shoulderOfferCondition: ImportParsingTypes[] = ["partOfParentRow", "rowInSheetWithRelation", "fixedValue"];
    shoulderStep: ImportParsingTypes[] = ["partOfParentRow", "rowInSheetWithRelation", "fixedValue"];
}

// Конфигурация импорта условий ценовых предложений
export type ImportShoulderOfferCondition = Configurations<
    ShoulderFieldConfiguration,
    "shoulderOfferCondition",
    ShoulderOfferCondition,
    ImportParsingTypes,
    {}
>;

// Конфигурация импорта надбавок
export type ImportAllowanceOffer = Configurations<
    ShoulderFieldConfiguration,
    "allowanceOffer",
    AllowanceOffer,
    ImportParsingTypes,
    {
        shoulderOfferCondition: ImportShoulderOfferCondition,
    }
>;

// Конфигурация импорта ценовых предложений
export type ImportShoulderOffer = Configurations<
    ShoulderFieldConfiguration,
    "shoulderOffer",
    ShoulderOffer,
    ImportParsingTypes,
    {
        shoulderOfferCondition: ImportShoulderOfferCondition,
        allowanceOffer: ImportAllowanceOffer,
    }
>;

// Конфигурация импорта шагов плеча
export type ImportShoulderStep = Configurations<
    ShoulderFieldConfiguration,
    "shoulderStep",
    ShoulderStep,
    ImportParsingTypes,
    {}
>;

// Типизация конфигцрации импорта плеч
export type ImportShoulderConfiguration = Configurations<
    ShoulderFieldConfiguration,
    "shoulder",
    Shoulder,
    ImportParsingTypes,
    {
        shoulderOffer: ImportShoulderOffer,
        shoulderStep: ImportShoulderStep,
    }
>

// Конфигурация дефолтных сущностей для ЦП плеча
class DefaultShoulderOfferSubEntities {
    shoulderOfferCondition: ImportShoulderOfferCondition = {
        title: "Условия ЦП плеча",
        entity: "shoulderOfferCondition",
        defaultSettings: new DefaultShoulderOfferConditionSettings,
        fieldsConfiguration: new ShoulderOfferConditionConfiguration,
        picture: "/static/755254270044707.jpg",
        defaultConfigPicture: "/static/755254270044707.jpg",
        canRemoveLastConfiguration: false,
        defaultSubEntityConfig: {},
        configuration: [{
            uuid: v4(),
            entity: "shoulderOfferCondition",
            picture: "/static/755254270044707.jpg",
            fieldsConfiguration: new ShoulderOfferConditionConfiguration,
            parsingConfig: null,
            parsingType: "partOfParentRow",
            settings: new DefaultShoulderOfferConditionSettings,
            subConfiguration: {}
        }],
    };

    allowanceOffer: ImportAllowanceOffer = {
        title: "Надбавки",
        entity: "allowanceOffer",
        defaultSettings: new DefaultAllowanceOfferSettings,
        canRemoveLastConfiguration: true,
        fieldsConfiguration: new AllowanceOfferConfiguration,
        picture: "/static/maxresdefault.jpg",
        defaultConfigPicture: "/static/maxresdefault.jpg",
        defaultSubEntityConfig: {
            shoulderOfferCondition: {
                title: "Условия ЦП надбавки",
                defaultSettings: new DefaultShoulderOfferConditionSettings,
                defaultSubEntityConfig: {},
                picture: "/static/shutterstock_1226684674.jpg",
                defaultConfigPicture: "/static/shutterstock_1226684674.jpg",
                canRemoveLastConfiguration: false,
                entity: "shoulderOfferCondition",
                fieldsConfiguration: new ShoulderOfferConditionConfiguration,
                configuration: [{
                    uuid: v4(),
                    entity: "shoulderOfferCondition",
                    picture: "/static/shutterstock_1226684674.jpg",
                    fieldsConfiguration: new ShoulderOfferConditionConfiguration,
                    parsingConfig: null,
                    parsingType: "partOfParentRow",
                    settings: new DefaultShoulderOfferConditionSettings,
                    subConfiguration: {}
                }],
            }
        },
        configuration: [],
    };
}

// Конфигурация дефолтных дочерних сущностей для сущности плеча
class DefaultShoulderSubEntities {
    shoulderStep: ImportShoulderStep = {
        title: "Шаги плеча",
        entity: "shoulderStep",
        defaultSettings: new DefaultShoulderStepSettings,
        fieldsConfiguration: new ShoulderStepConfiguration,
        defaultSubEntityConfig: {},
        canRemoveLastConfiguration: true,
        picture: "/static/120805.663420.4914.jpg",
        defaultConfigPicture: "/static/120805.663420.4914.jpg",
        configuration: []
    };
    shoulderOffer: ImportShoulderOffer = {
        title: "Ценовые предложения плеча",
        entity: "shoulderOffer",
        defaultSettings: new DefaultShoulderOfferSettings,
        fieldsConfiguration: new ShoulderOfferConfiguration,
        canRemoveLastConfiguration: false,
        defaultSubEntityConfig: new DefaultShoulderOfferSubEntities,
        picture: "/static/multimodalnaya-perevozka-gruza.jpeg",
        defaultConfigPicture: "/static/multimodalnaya-perevozka-gruza.jpeg",
        configuration: [{
            uuid: v4(),
            entity: "shoulderOffer",
            picture: "/static/multimodalnaya-perevozka-gruza.jpeg",
            fieldsConfiguration: new ShoulderOfferConfiguration,
            parsingConfig: null,
            parsingType: "partOfParentRow",
            settings: new DefaultShoulderOfferSettings,
            subConfiguration: new DefaultShoulderOfferSubEntities,
        }],
    };
}

// Конфигурация настроек сущностей для импорта плеч
export class DefaultShoulderEntitiesConfiguration implements ImportShoulderConfiguration {
    configuration: EntityParsingConfiguration<
        ShoulderFieldConfiguration,
        "shoulder",
        ShoulderConfiguration,
        "rowInSheet" | "rowInSheetWithRelation" | "partOfParentRow" | "fixedValue",
        {
            shoulderOffer: ImportShoulderOffer,
            shoulderStep: ImportShoulderStep,
        }
    >[] = [{
        uuid: v4(),
        entity: "shoulder",
        fieldsConfiguration: new ShoulderConfiguration,
        picture: "/static/Refrizheratornye-perevozki78.jpg",
        parsingConfig: {
            sheetIndex: 0,
            startRow: 0,
            endRow: 0,
        },
        parsingType: "rowInSheet",
        settings: new DefaultShoulderSettings,
        subConfiguration: new DefaultShoulderSubEntities,
    }];
    defaultSettings: Settings<ShoulderConfiguration> = new DefaultShoulderSettings;
    title: string = "Плечи";
    canRemoveLastConfiguration: boolean = false;
    picture?: string = "/static/Refrizheratornye-perevozki78.jpg";
    defaultConfigPicture?: string = "/static/Refrizheratornye-perevozki78.jpg";
    defaultSubEntityConfig: {
        shoulderOffer: ImportShoulderOffer;
        shoulderStep: ImportShoulderStep;
    } = new DefaultShoulderSubEntities;
    entity: "shoulder" = "shoulder";
    fieldsConfiguration: FieldConfigurationCollection<Shoulder> = new ShoulderConfiguration;
}