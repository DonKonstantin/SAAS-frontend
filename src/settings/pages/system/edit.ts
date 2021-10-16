import {Schemas} from "../../schema";
import React from "react";
import {PageUrl} from "./list";

// Тип, описывающий размеры группы
export type Size = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface SizeGroup {
    xl?: Size     // +1920px @media
    lg?: Size     // +1280px @media
    md?: Size     // +960px @media
    sm?: Size     // +600px @media
    xs?: Size     // +0px @media
}

export type Sizes = { (values: any): SizeGroup } | SizeGroup

// Интерфейс валидатора значений поля
export type ValidationResult = string | null
export type ValidationParams<T extends keyof Schemas> = {
    value: EditValueType,
    allValues: EntityValues<T>,
    primaryKey: any,
    additionData: any
}

export interface EditFieldValidator<T extends keyof Schemas> {
    /**
     * Валидация значения поля
     * @param params
     */
    Validate(params: ValidationParams<T>): Promise<ValidationResult>
}

// Тип значения поля формы редактирования сущности
export type EditValueType = string | number | boolean | null | Date | string[] | number[] | boolean[] | Date[]
export type EntityValues<T extends keyof Schemas> = { [F in keyof Schemas[T]['fields']]: EditValueType }

// Свойства компонента поля формы редактирования
export interface EditFieldProperties<T extends keyof Schemas = keyof Schemas,
    F extends keyof Schemas[T]['fields'] = keyof Schemas[T]['fields']> {
    fieldCode: F
}

// Свойства поля формы редактирования
export interface EditField<T extends keyof Schemas, F extends keyof Schemas[T]['fields']> {
    field: F,                                                   // Код поля, для которого задана настройка
    title: string                                               // Заголовок поля
    size?: Sizes                                                // Кастомные размеры поля
    // Значение по умолчанию или загрузчик значения по умолчанию
    defaultValue: EditValueType | {
        (params: { values?: EntityValues<T>, additionData?: { [F in keyof Schemas[T]['fields']]?: any } }): Promise<EditValueType>
    }
    validation: EditFieldValidator<T>[]                         // Валидаторы значений поля
    component: React.ComponentType<EditFieldProperties<T, F>>    // Компонент отображения поля

    // Handler видимости поля
    isVisible?: { (values: EntityValues<T>): boolean }
    // Отключение основного сохранения поля
    disableFieldMainStore?: { (values: EntityValues<T>): boolean }
    // Загрузчик дополнительных данных для отображения поля
    additionData?: {
        (values: EntityValues<T>, primaryKey: any): Promise<any>
    }
    // Обработка значения поля при копировании сущности
    onCopyValue?: {
        (
            primaryKey: any,
            value: EditValueType,
            originalValue: EditValueType,
            additionData: { [F in keyof Schemas[T]['fields']]?: any },
        ): Promise<{ value: EditValueType, additionData: any }>
    }
    // Предварительное сохранение данных перед сохранением основной сущности. Например сохранение сущности перед созданием основной.
    onBeforeSave?: {
        (
            value: EditValueType,
            values: EntityValues<T>,
            additionData: { [F in keyof Schemas[T]['fields']]?: any },
        ): Promise<EntityValues<T>>
    }
    // Пост сохранение данных после сохранения основной сущности. Например добавление отношений Many to Many
    onAfterSave?: {
        (
            value: EditValueType,
            values: EntityValues<T>,
            additionData: { [F in keyof Schemas[T]['fields']]?: any },
            primaryKey: any,
        ): Promise<void>
    }
}

// Свойства компонента группы полей формы редактирования
export interface EditFormGroupProperties<T extends keyof Schemas = keyof Schemas> {
    config: EditFormGroup<T>
}

// Свойства группы полей формы редактирования
export interface EditFormGroup<T extends keyof Schemas> {
    fields: EditField<T, keyof Schemas[T]['fields']>[]                   // Поля группы формы редактирования
    sizes: Sizes                                                        // Размеры группы
    component?: React.ComponentType<EditFormGroupProperties<T>>         // Кастомный компонент отображения группы полей
    isVisible?: { (values: EntityValues<T>): boolean }                    // Handler видимости поля
}

// Свойства страницы редактирования сущностей
export interface EditPageConfiguration<T extends keyof Schemas = keyof Schemas> {
    schema: T                                // Схема, к которой относится конфигурация
    storeSchema?: keyof Schemas              // Схема в которую необходимо записывать данные, если она не совпадает с той из которой забираем.
    groups: EditFormGroup<T>[]               // Группы полей формы редактирования
    listPageUrl: PageUrl                     // Ссылка на страницу листинга сущностей
    editPageUrlGenerator: { (primaryKey: any): PageUrl }   // Генератор ссылки на страницу редактирования сущности
    isSaveEnabled: boolean                   // Статус кнопки сохранения
    isCopyEnabled: boolean                   // Статус кнопки копирования сущности
    isSaveAndCloseEnabled: boolean           // Статус кнопки сохранить и закрыть
}