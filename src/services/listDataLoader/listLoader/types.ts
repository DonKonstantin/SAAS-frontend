import React from "react";
import {Schemas} from "../../../settings/schema";
import {SimpleValues} from "./listValues/SimpleValues";
import {RelationValue} from "./listValues/RelationValue";
import {ListLoadingParameters} from "./interfaces";
import {ListPageConfiguration} from "../../../settings/pages/system/list";
import {FirstCellProps} from "../../../components/ListPage/List/ListBody/ListRow";
import {EnumValue} from "./listValues/EnumValue";

// Свойства полей листинга сущностей
export interface ListFieldProperties<T> {
    align: AlignRow                                     // Выравнивание ячейки
    mainLangId: string                                  // Основной язык админки
    secondaryLangId: string                             // Дополнительный язык админки
    schema: keyof Schemas                               // Схема, к которой относится ячейка
    value: T                                            // Текущее значение поля
    rowValues: ListFieldRowColumnValues<keyof Schemas>  // Значение полей текущей строки
    additionProps: AdditionProps<T, any>                // Дополнительные свойства для сопредельных строк
    configuration: ListFieldConfiguration<any, any>     // Конфигурация поля
}

// Доступные системные типы полей
export type ListFieldTypes = { [P in keyof ListFieldValueTypes]: React.ComponentType<ListFieldProperties<ListFieldValueTypes[P]>> }

export class ListFieldValueTypes {
    Simple: SimpleValues;
    Relation: RelationValue;
    MultipleRelation: RelationValue[];
    Enum: EnumValue;
    Hidden: SimpleValues;
}

// Настройки отношения
export type RelationConfig<T extends keyof Schemas> = {
    relatedFields: FieldOfSchema<T>[]
}

// Конфигурация поля
type ListFieldTypesConfig = { [P in keyof ListFieldValueTypes]: any }
export type FieldOfSchema<T extends keyof Schemas> = keyof Schemas[T]['fields']

export class DefinedListFieldTypesConfig<T extends keyof Schemas> implements ListFieldTypesConfig {
    MultipleRelation: RelationConfig<T>;
    Relation: RelationConfig<T>;
    Simple: undefined;
    Enum: undefined;
    Hidden: undefined;
}

// Свойства дополнительного компонента для строк.
export interface AdditionProps<T, K> {
    item: T                             // Данные для отображения текущей строки
    rowState: K                         // Текущий State строки
    additionData: any                   // Дополнительные загруженные данные
    onSetRowState: (state: K) => void   // Изменение State текущей строки
    dense: boolean                      // Флаг уменьшенных паддингов
    hasEditAccess: boolean              // Флаг наличия прав редактирования
    mainLangId: string                  // Основной язык системы
    secondaryLangId: string             // Дополнительный язык системы
    isLastRow: boolean                  // Является последней строкой
    firstCell?: React.ComponentType<FirstCellProps>      // Компонент отображения дополнительной первой ячейки (Для древовидных листингов)
    configuration: ListPageConfiguration<keyof Schemas>  // Набор конфигурации для листингов
    onEditItem: { (item: any): void }                      // Обработчик кнопки редактирования
    onDeleteItems: { (items: any[]): void }                // Обработчик кнопки удаления
    onChangeAdditionData: { (additionData: any): void }    // Обработчик изменения дополнительных загруженных данных
}

// Интерфейс конфигурации стандартного поля
export interface FieldType<K extends keyof ListFieldValueTypes> {
    type: K // Тип поля
    customComponent?: React.ComponentType<ListFieldProperties<ListFieldValueTypes[K]>>  // Кастомный компонент, который будет отображать поле
    config: DefinedListFieldTypesConfig<any>[K]  // Конфигурация поля
}

// Конфигурация поля листинга сущностей
export type AlignRow = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export interface ListFieldConfiguration<T extends keyof Schemas, K extends keyof Schemas[T]["fields"]> {
    field: K            // Отображаемое поле
    width?: number      // Фиксированная ширина колонки
    align?: AlignRow;   // Выравнивание ячеек (кастомное)
    title: string       // Заголовок поля
    isEnabled: boolean  // Флаг отображения поля
    fieldType: FieldType<any>  // Тип поля
}

// Тип, описывающий значения строки листинга
export interface ListFieldRow<T extends keyof Schemas> {
    primaryKeyValue: any
    columnValues: ListFieldRowColumnValues<T>
}

export type ListFieldRowColumnValues<T extends keyof Schemas> = {
    [P in keyof ListFieldsConfiguration<T>["fields"]]: ListFieldsConfiguration<T>["fields"][P]["fieldType"]['type']
}

// Результат выполнения запроса листинга сущностей
export type ListResponse<T extends keyof Schemas> = {
    count: number | undefined
    rows: ListFieldRow<T>[]
    parameters: ListLoadingParameters<T>
    additionData: any
}

// Параметры конфигурации листинга элементов
export type FieldsList<T extends keyof Schemas> = { [P in keyof Schemas[T]['fields']]: ListFieldConfiguration<T, any> }

export interface ListFieldsConfiguration<T extends keyof Schemas> {
    fields: FieldsList<T>                                             // Параметры отображения базовых полей сущности
    actions?: React.ComponentType<AdditionProps<ListFieldRow<T>, any>>    // Дополнительные действия, которые должны отображаться помимо основных
    rowHigher?: React.ComponentType<AdditionProps<ListFieldRow<T>, any>>  // Дополнительная строка данных выше текущей. Для вывода доп. информации
    rowBelow?: React.ComponentType<AdditionProps<ListFieldRow<T>, any>>   // Дополнительная строка данных ниже текущей. Для вывода доп. информации
    additionDataLoader?: (items: ListFieldRow<T>[], token?: string) => Promise<any>   // Загрузчик дополнительных данных для отображения
    defaultOrderDirection?: "asc" | "desc" // Порядок сортировки по умолчанию
}