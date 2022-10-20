import {FieldType, Schemas} from "../../../settings/schema";
import {SliderComponentValues} from "./fieldValues/Slider";
import {SimpleComponentValue} from "./fieldValues/SimpleComponentValue";
import {SliderBaseValues} from "./fieldBaseData/SliderBaseValues";
import {VariantsBaseValues} from "./fieldBaseData/VariantsBaseValues";
import React from "react";
import {VariantsComponentValue} from "./fieldValues/VariantsComponentValue";

// Конфигурация фильтра для таблицы
export type FilterFieldsConfiguration<T extends keyof Schemas> = {
    [F in keyof Schemas[T]['fields']]?: RegisteredFilterFieldConfiguration<T, F>[AvailableFilterField]
}

// Свойства поля фильтрации
export class FilterFieldProperties<T extends keyof Schemas = keyof Schemas, F extends keyof Schemas[T]['fields'] = keyof Schemas[T]['fields']> {
    fieldCode: F
}

// Базовая конфигурация поля фильтрации
export interface BaseFilterFieldConfiguration<T extends keyof Schemas,
    F extends keyof Schemas[T]['fields'],
    C extends AvailableFilterField> {
    schema: T
    field: F
    title: string
    filterType: C
    customComponent?: React.ComponentType<FilterFieldProperties>
}

// Тип, описывающий конфигурацию поля отношения
export interface RelationConfiguration<R extends keyof Schemas> {
    schema: R
    visibleFields: SchemaField<R>[]
    joinSymbol?: string
}

// Конфигурация поля отношений
export type SchemaField<R extends keyof Schemas> = keyof Schemas[R]['fields']

export interface RelationFilterFieldConfiguration<T extends keyof Schemas, F extends keyof Schemas[T]['fields'], C extends AvailableFilterField> extends BaseFilterFieldConfiguration<T, F, C> {
    relationConfiguration: RelationConfiguration<any>
}

// Конфигурация для поля поиска
export interface SearchFilterFieldConfiguration<T extends keyof Schemas, F extends keyof Schemas[T]['fields'], C extends AvailableFilterField> extends RelationFilterFieldConfiguration<T, F, C> {
    searchFields: string[]
}

// Доступные системные типы фильтра
export type AvailableFilterField = keyof FilterFieldComponents
export type FilterField = React.ComponentType<FilterFieldProperties>

export interface FilterFieldComponents {
    EqualsInt: FilterField
    EqualsFloat: FilterField
    EqualsString: FilterField
    Like: FilterField
    IntegerSlider: FilterField
    FloatSlider: FilterField
    VariantsSelectorInt: FilterField
    VariantsSelectorFloat: FilterField
    VariantsSelectorString: FilterField
    RelationVariantsSelector: FilterField
    RelationAutocompleteSelector: FilterField
    DateTimeRange: FilterField
    Checkbox: FilterField
    Switch: FilterField
    EnumSelector: FilterField
}

// Параметры конфигурации для доступных полей фильтрации
export type FilterFieldConfiguration<T extends keyof Schemas, F extends keyof Schemas[T]['fields']> = { [P in AvailableFilterField]: BaseFilterFieldConfiguration<T, F, P> }

export class RegisteredFilterFieldConfiguration<T extends keyof Schemas, F extends keyof Schemas[T]['fields']> implements FilterFieldConfiguration<T, F> {
    FloatSlider: BaseFilterFieldConfiguration<T, F, "FloatSlider">;
    IntegerSlider: BaseFilterFieldConfiguration<T, F, "IntegerSlider">;
    Like: BaseFilterFieldConfiguration<T, F, "Like">;
    RelationVariantsSelector: RelationFilterFieldConfiguration<T, F, "RelationVariantsSelector">;
    RelationAutocompleteSelector: RelationFilterFieldConfiguration<T, F, "RelationAutocompleteSelector">;
    Checkbox: BaseFilterFieldConfiguration<T, F, "Checkbox">;
    Switch: BaseFilterFieldConfiguration<T, F, "Switch">;
    EqualsFloat: BaseFilterFieldConfiguration<T, F, "EqualsFloat">;
    EqualsInt: BaseFilterFieldConfiguration<T, F, "EqualsInt">;
    EqualsString: BaseFilterFieldConfiguration<T, F, "EqualsString">;
    VariantsSelectorFloat: BaseFilterFieldConfiguration<T, F, "VariantsSelectorFloat">;
    VariantsSelectorInt: BaseFilterFieldConfiguration<T, F, "VariantsSelectorInt">;
    VariantsSelectorString: BaseFilterFieldConfiguration<T, F, "VariantsSelectorString">;
    EnumSelector: BaseFilterFieldConfiguration<T, F, "EnumSelector">;
    DateTimeRange: BaseFilterFieldConfiguration<T, F, "DateTimeRange">;
}

// Параметры конфигурации для доступных полей фильтрации
export type FilterFieldComponentValues = { [P in AvailableFilterField]: any }

export class RegisteredFilterFieldComponentValues implements FilterFieldComponentValues {
    FloatSlider: SliderComponentValues<number>;
    IntegerSlider: SliderComponentValues<number>;
    Like: SimpleComponentValue<string | null>;
    RelationVariantsSelector: VariantsComponentValue<(string | number)[]>;
    RelationAutocompleteSelector: VariantsComponentValue<(string | number)[]>;
    Checkbox: SimpleComponentValue<boolean | null>;
    Switch: SimpleComponentValue<boolean | null>;
    EqualsFloat: SimpleComponentValue<number | null>;
    EqualsInt: SimpleComponentValue<number | null>;
    EqualsString: SimpleComponentValue<string | null>;
    VariantsSelectorFloat: VariantsComponentValue<number[]>;
    VariantsSelectorInt: VariantsComponentValue<number[]>;
    VariantsSelectorString: VariantsComponentValue<string[]>;
    EnumSelector: SimpleComponentValue<string | null>;
    DateTimeRange: SliderComponentValues<string>;
}

// Параметры конфигурации для доступных полей фильтрации
export type FilterFieldComponentBaseValues = { [P in AvailableFilterField]: any }

export class RegisteredFilterFieldBaseComponentValues implements FilterFieldComponentBaseValues {
    FloatSlider: SliderBaseValues<number>;
    IntegerSlider: SliderBaseValues<number>;
    Like: undefined;
    RelationVariantsSelector: VariantsBaseValues<string>;
    Checkbox: undefined;
    Switch: undefined;
    EqualsFloat: undefined;
    EqualsInt: undefined;
    EqualsString: undefined;
    VariantsSelectorFloat: VariantsBaseValues<number>;
    VariantsSelectorInt: VariantsBaseValues<number>;
    VariantsSelectorString: VariantsBaseValues<string>;
    EnumSelector: undefined;
    RelationAutocompleteSelector: VariantsBaseValues<string>;
    DateTimeRange: SliderBaseValues<string>;
}

// Предзагружаемые данные для полей фильтрации
export type FilterFieldPreloadedData = { [P in AvailableFilterField]: any }

export class DeclaredFilterFieldPreloadedData implements FilterFieldPreloadedData {
    Checkbox: undefined;
    EqualsFloat: undefined;
    EqualsInt: undefined;
    EqualsString: undefined;
    FloatSlider: undefined;
    IntegerSlider: undefined;
    Like: undefined;
    RelationVariantsSelector: RelationVariantsSelectorPreloadData;
    RelationAutocompleteSelector: RelationVariantsSelectorPreloadData;
    Switch: undefined;
    VariantsSelectorFloat: undefined;
    VariantsSelectorInt: undefined;
    VariantsSelectorString: undefined;
    EnumSelector: undefined;
    DateTimeRange: undefined;
}

// Данные, необходимые для работы фильтра по отношениям
export class RelationVariantsSelectorPreloadData {
    choseVariants: ChooseVariant[] = []
}

export class ChooseVariant {
    key: any;
    title: string
}

// Типы фильтров, доступные для определенного типа поля
export type FilterFieldToFieldType = { [P in FieldType]: AvailableFilterField[] }

export class AvailableFilterFieldFieldTypes implements FilterFieldToFieldType {
    "Boolean!": AvailableFilterField[] = [
        "Switch",
        "Checkbox",
    ];
    "DateTime!": AvailableFilterField[] = [
        "DateTimeRange",
    ];
    "Float!": AvailableFilterField[] = [
        "EqualsFloat",
        "FloatSlider",
        "VariantsSelectorFloat"
    ];
    "ID!": AvailableFilterField[] = [
        "EqualsString",
        "RelationVariantsSelector",
        "RelationAutocompleteSelector",
    ];
    "Int!": AvailableFilterField[] = [
        "EqualsInt",
        "IntegerSlider",
        "VariantsSelectorInt",
        "RelationVariantsSelector",
        "RelationAutocompleteSelector",
    ];
    "String!": AvailableFilterField[] = [
        "EqualsString",
        "Like",
        "VariantsSelectorString",
        "RelationVariantsSelector",
        "RelationAutocompleteSelector",
    ];
    Boolean: AvailableFilterField[] = [
        "Switch",
        "Checkbox",
    ];
    DateTime: AvailableFilterField[] = [];
    Float: AvailableFilterField[] = [
        "EqualsFloat",
        "FloatSlider",
        "VariantsSelectorFloat"
    ];
    ID: AvailableFilterField[] = [
        "EqualsString",
        "RelationVariantsSelector",
        "RelationAutocompleteSelector",
    ];
    Int: AvailableFilterField[] = [
        "EqualsInt",
        "IntegerSlider",
        "VariantsSelectorInt",
        "RelationVariantsSelector",
        "RelationAutocompleteSelector",
    ];
    String: AvailableFilterField[] = [
        "EqualsString",
        "Like",
        "VariantsSelectorString",
        "RelationVariantsSelector",
        "RelationAutocompleteSelector",
    ];
    "Enum": AvailableFilterField[] = [
        "EnumSelector"
    ];
    "Enum!": AvailableFilterField[] = [
        "EnumSelector"
    ];
    "Object_Passport": AvailableFilterField[] = [
      
    ];
    "NullableID": AvailableFilterField[] = [
      
    ];
    "Project_PlayList_File": AvailableFilterField[] = [
      
    ];
    "Player_Code!": AvailableFilterField[] = [
      
    ];
    "Project_Channel": AvailableFilterField[] = [
      
    ];
    "Player_Without_Relations": AvailableFilterField[] = [
      
    ];
}
