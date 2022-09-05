import {Schemas} from "../../schema";
import {FilterFieldsConfiguration} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration} from "../../../services/listDataLoader/listLoader/types";
import React from "react";
import {ListHeaderProps} from "../../../components/ListPageParts/TableCaption";

// Тип, описывающий ссылку на страницу
export type PageUrl = { href: string, as?: string }

// Тип, описывающий callback генерации ссылки на страницу редактирования
export type EditPageLinkGenerator = { (primaryKey: any): PageUrl }

// Параметры конфигурации страницы листинга сущностей
export interface ListPageConfiguration<T extends keyof Schemas = keyof Schemas> {
    schema: T                                                           // Код схемы, для которой задается конфигурация
    deleteSchema?: keyof Schemas                                        // Схема, по которой происходит удаление сущностей, если она не совпадает со схемой листинга
    disableMultiChoose?: boolean                                        // Если установить в true, то отключится возможность множественного выбора
    elementsPerPage: number                                             // Количество элементов на странице по умолчанию
    listFields: ListFieldsConfiguration<T>                              // Параметры полей листинга
    filter: FilterFieldsConfiguration<T>                                // Параметры конфигурации фильтра
    editPageUrl: EditPageLinkGenerator                                  // Генератор ссылки на страницу редактирования
    addPageUrl: PageUrl | { (): PageUrl }                               // Ссылка на страницу добавления
    action?: React.ComponentType<ListHeaderProps>                       // Слот для действий нижний правый угол
    rowSelectAction?: boolean;                                          // Тогдл дающий возможность выбирать элемент нажимая на всю поверхность строки
    onCopyRows?: { (primaryKeys: string[]): Promise<void> }             // Обработка копирования строк
    additionFilter?: string                                             // Дополнительный фильтр для листинга. Вводится в формате подстроки GraphQL запроса
    additionButtonTitle?: string                                        // Текст для кнопки добавления новой сущности
    hidePagination?: boolean                                            // Отключает пагинацию листинга
    hideFilter?: boolean                                                // Отключает фильтр для листинга
}
