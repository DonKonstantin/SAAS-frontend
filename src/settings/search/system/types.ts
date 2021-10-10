import {Schemas} from "../../schema";
import React from "react";
import {IconProps} from "@material-ui/core";

// Свойства компонента вывода информации по найденной сущности
export class SearchResultStringProps<T, K, F> {
    primaryKey: any;     // Первичный ключ
    fields: T;           // Загруженные поля
    additionData: K;     // Дополнительные данные
    entityData: F;       // Загруженные данные по полям сущности
}

// Настройки поисковой сущности
export interface SearchResultEntity<T extends keyof Schemas> {
    entityCode: string                                                                  // Код сущности
    entityTitle: string                                                                 // Заголовок группы поисковой выдачи
    color?: string                                                                      // Цвет подложки аватара результата поиска
    icon: React.ComponentType<IconProps>                                                // Иконка результата
    editAccessRule: string[]                                                            // Права, необходимое для редактирования сущности
    schema: T                                                                           // Схема, к которой относится сущность.
    editPageUrlGenerator: { (primaryKey: any): { href: string, as?: string } }          // Генератор ссылки на страницу редактирования
    fieldsToLoad: (keyof Schemas[T]['fields'])[]                                        // Поля, которые необходимы для отображения строки
    additionDataLoader?: { (primaryKeys: any[]): Promise<any> }                         // Загрузчик дополнительных данных для отображения строки (по первичным ключам)
    entityDataLoader?: { (fields: any): Promise<any> }                                  // Загрузчик дополнительных данных для отображения строки (по полям сущности)
    resultDrawComponent: React.ComponentType<SearchResultStringProps<any, any, any>>    // Компонент отображения строки поисковой выдачи
}

// Конфигурация поиска
export type SearchConfig = SearchResultEntity<keyof Schemas>[]
