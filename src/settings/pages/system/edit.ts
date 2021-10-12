import {Schemas} from "../../schema";
import React from "react";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "./list";
import {AdditionEditParams} from "../../../containers/EntityEdit";

// Тип, описывающий размеры группы
export type Size = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
interface SizeGroup {
    xl?: Size     // +1920px @media
    lg?: Size     // +1280px @media
    md?: Size     // +960px @media
    sm?: Size     // +600px @media
    xs?: Size     // +0px @media
}

export type Sizes = {(values: any): SizeGroup} | SizeGroup

// Интерфейс валидатора значений поля
export type ValidationResult = string | null
export type ValidationParams<T extends keyof Schemas> = {value: EditValueType, allValues: EntityValues<T>, primaryKey: any, additionData: any}
export interface EditFieldValidator<T extends keyof Schemas> {
    /**
     * Валидация значения поля
     * @param params
     */
    Validate(params: ValidationParams<T>): Promise<ValidationResult>
}

// Тип значения поля формы редактирования сущности
export type EditValueType = string | number | boolean | null | Date | string[] | number[] | boolean[] | Date[]
export type EntityValues<T extends keyof Schemas> = {[F in keyof Schemas[T]['fields']]: EditValueType}

// Свойства компонента поля формы редактирования
export interface EditFieldProperties<T extends keyof Schemas, F extends keyof Schemas[T]['fields']> {
    primaryKey: any                                     // Значение первичного ключа
    value: EditValueType                                // Текущее значение поля во внутреннем формате
    values: EntityValues<T>                             // Значения полей формы
    configuration: EditField<T,F>                       // Конфигурация отображаемого поля
    error: ValidationResult                             // Ошибка валидации, если она есть
    additionData: any                                   // Дополнительные данные, загруженные загрузчиком
    onChange: {(value: EditValueType): void}            // Обработчик изменения поля
    onAdditionDataChange: {(additionData: any): void}   // Обработчик изменения дополнительных данных, загруженных загрузчиком
    mainLangId: string                                  // ID основного языка
    secondaryLangId: string                             // ID дополнительного языка
}

// Свойства поля формы редактирования
export interface EditField<T extends keyof Schemas, F extends keyof Schemas[T]['fields']> {
    field: F,                                                   // Код поля, для которого задана настройка
    title: string                                               // Заголовок поля
    size?: Sizes                                                // Кастомные размеры поля
    // Значение по умолчанию или загрузчик значения по умолчанию
    defaultValue: EditValueType | {
        (params: {token?: string, values?: EntityValues<T>, additionData?: any}): Promise<EditValueType>
    }
    validation: EditFieldValidator<T>[]                         // Валидаторы значений поля
    component: React.ComponentType<EditFieldProperties<T,F>>    // Компонент отображения поля

    // Handler видимости поля
    isVisible?: {(values: EntityValues<T>): boolean}
    // Отключение основного сохранения поля
    disableFieldMainStore?: {(values: EntityValues<T>): boolean}
    // Загрузчик дополнительных данных для отображения поля
    additionData?: {
        (values: EntityValues<T>, primaryKey: any, token?: string): Promise<any>
    }
    // Обработка значения поля при копировании сущности
    onCopyValue?: {
        (
            primaryKey: any,
            value: EditValueType,
            originalValue: EditValueType,
            additionData: any,
        ): Promise<{value: EditValueType, additionData: any}>
    }
    // Предварительное сохранение данных перед сохранением основной сущности. Например сохранение сущности перед созданием основной.
    onBeforeSave?: {
        (
            value: EditValueType,
            values: EntityValues<T>,
            additionData: any,
        ): Promise<EntityValues<T>>
    }
    // Пост сохранение данных после сохранения основной сущности. Например добавление отношений Many to Many
    onAfterSave?: {
        (
            value: EditValueType,
            values: EntityValues<T>,
            additionData: any,
            primaryKey: any,
        ): Promise<void>
    }
}

// Свойства кастомного компонента формы редактирования
export interface CustomComponentProps<T extends keyof Schemas> {
    primaryKey: any                         // Значение первичного ключа
    values: EntityValues<T>                 // Значения полей формы
    additionData: (any | null)[][]          // Значения дополнительных данных для текущей группы
    customComponentData: any                // Кастомные данные, загруженные для дополнительного компонента
    mainLangId: string                      // ID основного языка
    secondaryLangId: string                 // ID дополнительного языка
    onChange: {(values: EntityValues<T>): void}                         // Обработка изменения значений формы
    onAdditionDataChange: {(additionData: (any | null)[][]): void}      // Обработка изменения дополнительных данных
}

// Свойства компонента группы полей формы редактирования
export interface EditFormGroupProperties<T extends keyof Schemas> {
    primaryKey: any                         // Значение первичного ключа
    values: EntityValues<T>                 // Значения полей формы
    additionData: (any | null)[]            // Значения дополнительных данных для текущей группы
    customComponentData: any                // Кастомные данные, загруженные для дополнительного компонента
    configuration: EditFormGroup<T>         // Конфигурация группы полей
    validationResults: ValidationResult[]   // Результаты валидации группы
    mainLangId: string                      // ID основного языка
    secondaryLangId: string                 // ID дополнительного языка
    onChangeValidationResults: {(results: ValidationResult[]): void}    // Обработка изменения результатов валидации
    onChange: {(values: EntityValues<T>): void}                         // Обработка изменения значений формы
    onAdditionDataChange: {(additionData: (any | null)[]): void}        // Обработка изменения дополнительных данных
}

// Свойства группы полей формы редактирования
export interface EditFormGroup<T extends keyof Schemas> {
    title: string                                                       // Заголовок группы полей формы редактирования
    fields: EditField<T,keyof Schemas[T]['fields']>[]                   // Поля группы формы редактирования
    sizes: Sizes                                                        // Размеры группы
    component?: React.ComponentType<EditFormGroupProperties<T>>         // Кастомный компонент отображения группы полей
    isVisible?: {(values: EntityValues<T>): boolean}                    // Handler видимости поля
}

// Свойства страницы редактирования сущностей
export interface EditPageConfiguration<T extends keyof Schemas> {
    schema: T                                // Схема, к которой относится конфигурация
    storeSchema?: keyof Schemas              // Схема в которую необходимо записывать данные, если она не совпадает с той из которой забираем.
    title: {(primaryKey: any): string}       // Генератор title страницы редактирования сущности
    header: {(primaryKey: any): string}      // Генератор заголовка страницы редактирования сущности
    entityName: string                       // Название редактируемой сущности
    editAccessRules: string[]                // Право, необходимое для редактирования сущностей
    groups: EditFormGroup<T>[]               // Группы полей формы редактирования
    listPageUrl: PageUrl                     // Ссылка на страницу листинга сущностей
    listPageConfig: ListPageConfiguration<keyof Schemas> // Конфигурация страницы листинга сущностей
    editPageUrlGenerator: {(primaryKey: any, additionEditParams: AdditionEditParams): PageUrl}   // Генератор ссылки на страницу редактирования сущности

    customComponentLoadData?: {(values: EntityValues<T>, primaryKey: any, token?: string): Promise<any>}    // Загрузка дополнительных данных для кастомного компонента
    bottomCustomComponent?: React.ComponentType<CustomComponentProps<T>>                                    // Компонент вывода дополнительных данных формы редактирования

    isSaveEnabled: boolean                   // Статус кнопки сохранения
    isCopyEnabled: boolean                   // Статус кнопки копирования сущности
    isSaveAndCloseEnabled: boolean           // Статус кнопки сохранить и закрыть
}