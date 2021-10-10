import {Schemas} from "../../settings/schema";

// Тип, описывающий обработанные сущности
export type WithProcessingStatus<T> = T & Partial<{
    is_processed: boolean
    error: string
}>

// Конфигурация для задания отношения
export type RelationConfiguration<S extends keyof Schemas> = {
    relatedEntityCode: string
    relatedEntitySchema: S
    fieldsToLoad: (keyof Schemas[S]['fields'])[]
    valueLabelGenerator: { (option: { [T in keyof Schemas[S]['fields']]: any }): string }
    primaryKeyGetter: { (option: { [T in keyof Schemas[S]['fields']]: any }): any }
};

// Конфигурация поля для настраиваемого объекта
export type FieldConfiguration<T, field extends keyof T> = {
    // Можно ли кастомизировать конфигурацию поля
    isConfigurable: boolean | {
        <
            Entities extends object,
            Key extends keyof Entities,
            Entity extends object,
            ParsingType extends ImportParsingTypes,
            SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
        >(config: EntityParsingConfiguration<Entities, Key, Entity, ParsingType, SubEntityConfig>): boolean
    }
    field: field                                                          // Код поля, для которого создана конфигурация
    fieldValueType: "string" | "number" | "dateTime" | "boolean" | "enum" // Тип значения поля
    fieldIsNullable: boolean                                              // Допустимо ли использовать null в качестве значения поля
    fieldIsArray?: boolean                                                // Является ли значение поля массивом
    fieldTitle: string                                                    // Заголовок для настроек поля
    relation?: RelationConfiguration<keyof Schemas>                       // Конфигурация отношения для поля
    dateConvertation?: { (date: Date): Date }                             // Callback для конвертации значения даты
    dateNormalization?: { (date: Date): Date }                            // Callback для нормализации значения даты перед отображением

    // Получение значения по умолчанию для текущего поля
    defaultValue?: {(): Promise<any>}

    // Настройка списка значений для fieldValueType = enum
    enum?: {
        // Варианты значений
        variants: {
            [T in string]: {
                title: string     // Название значения
                shortName: string // Краткое название
                aliases: string[] // Альтернативные варианты значения для парсинга, под капотом будут включать код и заголовок
            }
        }
    }
};

// Тип описывающий настройки конфигурации для определнной сущности
export type FieldConfigurationCollection<T> = {
    [M in keyof T]: FieldConfiguration<T, M>
};

// Конфигурация для строк из листа
export type SheetConfig = {
    sheetIndex: number
    startRow: number
    endRow: number
};

// Конфигурация для строк из листа с отношением
export type SheetWithRelationConfig = SheetConfig & {
    parentIdColumn: number
}

// Предустановленные типы конфигураций для вариантов парсинга
// По сути определяют источник данных для обработки значений. К примеру, можно выбрать
// в качестве источника строку таблицы, или например жестко заданное значение.
export type ImportParsingConfigurationTypes = {
    rowInSheet: SheetConfig                         // Строка в одном из листов загруженного файла
    rowInSheetWithRelation: SheetWithRelationConfig // Строка в одном из листов с привязкой к родителю
    partOfParentRow: null                           // Часть родительской строки
    fixedValue: null                                // Фиксированное значение
}

// Доступные типы парсингов
export type ImportParsingTypes = keyof ImportParsingConfigurationTypes;

type ParsingTypeNames = {[T in keyof ImportParsingConfigurationTypes]: string}
export class ImportParsingConfigurationTypeNames implements ParsingTypeNames {
    fixedValue: string = "Фиксированное значение";
    partOfParentRow: string = "Часть строки родителя";
    rowInSheet: string = "Строки на листе";
    rowInSheetWithRelation: string = "Строки со связью";
}

// Конфигурация импорта для переданной сущности
export type EntityParsingConfiguration<
    Entities extends object,
    Key extends keyof Entities,
    Entity extends object,
    ParsingType extends ImportParsingTypes,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
> = {
    uuid: string
    entity: Key,
    picture?: string
    fieldsConfiguration: FieldConfigurationCollection<Entity>
    parsingType: ParsingType
    parsingConfig: ImportParsingConfigurationTypes[ParsingType]
    settings: Settings<Entity>
    subConfiguration: SubEntityConfig
}

// Настроенные конфигурации источников данных для сущностей
export type Configurations<
    Entities extends object,
    Key extends keyof Entities,
    Entity extends object,
    ParsingType extends ImportParsingTypes,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
> = {
    title: string
    entity: Key,
    picture?: string
    defaultConfigPicture?: string
    fieldsConfiguration: FieldConfigurationCollection<Entity>
    canRemoveLastConfiguration: boolean
    defaultSettings: Settings<Entity>
    defaultSubEntityConfig: SubEntityConfig
    configuration: EntityParsingConfiguration<Entities, Key, Entity, ParsingType, SubEntityConfig>[]
};

// Конфигурация для колонки
export type ColumnConfiguration = {
    columnIndex: number
    delimiter: string
    isNeedSearchNullableTerminal: boolean
}

// Конфигурация для жестко заданной ячейки
export type CellConfiguration = {
    sheetIndex: number
    columnIndex: number
    rowIndex: number
    delimiter: string
    isNeedSearchNullableTerminal: boolean
}

// Конфигурация для жестко заданного значения
export type FixedValueConfiguration = {
    value: any
    isNeedLoadDefault: boolean
};

// Доступные для выбора типы обработки импортируемого файла
export type ImportProcessingConfigurationTypes = {
    fixedValue: FixedValueConfiguration // Жестко заданное значение
    column: ColumnConfiguration         // Колонка
    cell: CellConfiguration             // Ячейка
    uuid: undefined                     // UUID
    none: undefined                     // Значение на задано
};

// Тип обработки импортируемых данных
export type ImportProcessingConfigurationType = keyof ImportProcessingConfigurationTypes

// Названия типов обработки данных для импорта
type ImportProcessingNamesType = {[T in ImportProcessingConfigurationType]: string}
export class ImportProcessingNames implements ImportProcessingNamesType {
    cell: string = "Ячейка";
    column: string = "Колонка";
    fixedValue: string = "Фиксированное значение";
    uuid: string = "UUID";
    none: string = "Не задано";
    default: string = "По умолчанию";
}

// Коллекция доступных для выбора вариантов обработки для вариантов парсинга
type ProcessingToParsingVariants = { [T in ImportParsingTypes]: ImportProcessingConfigurationType[] }
export class ImportProcessingToParsingVariants implements ProcessingToParsingVariants {
    fixedValue: ImportProcessingConfigurationType[] = ["fixedValue", "cell", "none", "uuid"];
    partOfParentRow: ImportProcessingConfigurationType[] = ["fixedValue", "cell", "column", "none", "uuid"];
    rowInSheet: ImportProcessingConfigurationType[] = ["fixedValue", "cell", "column", "none", "uuid"];
    rowInSheetWithRelation: ImportProcessingConfigurationType[] = ["fixedValue", "cell", "column", "none", "uuid"];
}

// Доступные для выбора варианты конфигурации для конкретного типа сущности
export type AvailableParsingTypes<T extends object> = {[F in keyof T]: ImportParsingTypes[]}

// Настройки конфигурации поля для импорта
// Содержат реальную конфигурацию для поля
export type FieldSettings<T, field extends keyof T, config extends ImportProcessingConfigurationType> = {
    field: field
    type: config
    configuration: ImportProcessingConfigurationTypes[config]
}

// Полный список настроек для сущнсоти
export type Settings<T> = {[field in keyof T]: FieldSettings<T, field, ImportProcessingConfigurationType>}