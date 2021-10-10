import React from "react";
import {EditFieldProperties, EditValueType, EntityValues} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";

// Фабрика компонента поля
export type TFieldsFactory<T extends object> = {(params?: T): {
    // Компонент отображения поля
    component: React.ComponentType<EditFieldProperties<keyof Schemas, any>>,

    // Загрузчик дополнительных данных для отображения поля
    additionData?: {
        (values: EntityValues<keyof Schemas>, primaryKey: any, token?: string): Promise<any>
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
            values: EntityValues<keyof Schemas>,
            additionData: any,
        ): Promise<EntityValues<keyof Schemas>>
    }
}}