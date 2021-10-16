import {BehaviorSubject, OperatorFunction} from "rxjs";
import React, {useEffect, useState} from "react";
import withBehaviourSubject from "../connectors/withBehaviourSubject";
import {Schemas} from "../settings/schema";
import {EntityData} from "../services/entityGetterService/interface";
import {EditValueType} from "../settings/pages/system/edit";
import {entityGetterService} from "../services/entityGetterService";
import {notificationsDispatcher} from "../services/notifications";
import i18n from "i18next";
import {editSchemaConfiguration} from "../settings/pages";
import {entityValidator} from "../services/validation/validator";
import {ValidationResults} from "../services/validation/validator/interfaces";
import {entityStoreService} from "../services/entityStoreService";

// Контекст шагов импорта
export type EntityEditHocContext<T extends keyof Schemas = keyof Schemas> = {
    entityData: EntityData<T> | undefined
    validation: { [F in keyof Schemas[T]['fields']]?: string }
    isActionInProgress: boolean
};

// События, происходящие с контекстом
type EntityEditHocActions<T extends keyof Schemas = keyof Schemas> = {
    // Установка схемы для работы контекста
    setSchema: { (schema: T, primaryKey?: string) }

    // Обработка изменения значения поля формы редаткирования
    onChangeFieldValue: { <K extends keyof Schemas[T]['fields']>(field: K, callback: { (value: EditValueType): EditValueType }): void }

    // Обработка сброса значения поля до значения по умолчанию
    onResetFieldValue: { <K extends keyof Schemas[T]['fields']>(field: K): void }

    // Обработка сохранения сущности
    onSave: { (isNeedCopy?: boolean): Promise<string | undefined> }
};

// Свойства контекста по умолчанию
class DefaultContext implements EntityEditHocContext {
    entityData: EntityData | undefined;
    isActionInProgress: boolean = false;
    validation: { [F in keyof Schemas[keyof Schemas]["fields"]]?: string } = {};
}

// Создаем изначальный State
const context$ = new BehaviorSubject<EntityEditHocContext>(new DefaultContext);

/**
 * Валидация сущности. Возвращает валидированный объект сущности
 * @param data
 */
const validateEntity = async (data: EntityData): Promise<ValidationResults> => {
    const {schema, primaryKey} = data

    return await entityValidator().Validate(primaryKey, schema, {...data})
}

/**
 * Обработка сохранения сущности
 * @param isNeedCopy
 */
const onSave: EntityEditHocActions['onSave'] = async (isNeedCopy = false) => {
    const {entityData} = context$.getValue()
    if (!entityData) {
        return
    }

    context$.next({...context$.getValue(), isActionInProgress: true})

    const {schema, primaryKey} = entityData
    const validation = await validateEntity(entityData)
    context$.next({
        ...context$.getValue(),
        validation: validation.validationResults,
    })

    if (validation.isError) {
        context$.next({...context$.getValue(), isActionInProgress: false})

        notificationsDispatcher().dispatch({
            message: i18n.t(`Необходимо исправить некоторые поля`),
            type: "warning"
        })

        return
    }

    try {
        const newPrimaryKey = await entityStoreService().Store({
            schema: schema,
            primaryKey: primaryKey,
            isNeedCopy: isNeedCopy,
            data: entityData,
        })

        notificationsDispatcher().dispatch({
            message: i18n.t(`Элемент успешно сохранен`),
            type: "success"
        })

        context$.next({...context$.getValue(), isActionInProgress: false})

        return newPrimaryKey
    } catch (e) {
        notificationsDispatcher().dispatch({
            message: i18n.t(`Не удалось сохранить элемент`),
            type: "error"
        })

        return
    }
}

/**
 * Обработка сброса значения поля до значения по умолчанию
 * @param field
 */
const onResetFieldValue: EntityEditHocActions['onResetFieldValue'] = async field => {
    const {entityData} = context$.getValue()
    if (!entityData) {
        return
    }

    const {schema, originalValues, additionData, values} = entityData
    const config = editSchemaConfiguration()[schema]
    if (!config) {
        return
    }

    const fieldConfig = config.groups
        .map(g => g.fields)
        .flat()
        .find(fieldConf => fieldConf.field === field)

    if (!fieldConfig) {
        return
    }

    const {defaultValue = originalValues[field]} = fieldConfig
    try {
        let resetValue: EditValueType = defaultValue as EditValueType
        if (typeof defaultValue === "function") {
            resetValue = await defaultValue({values: values, additionData: additionData})
        }

        const {entityData, validation} = context$.getValue()
        if (!entityData) {
            return
        }

        context$.next({
            ...context$.getValue(),
            validation: {
                ...validation,
                [field]: undefined
            },
            entityData: {
                ...entityData,
                values: {
                    ...entityData.values,
                    [field]: resetValue
                }
            }
        })
    } catch (e) {
        notificationsDispatcher().dispatch({
            message: i18n.t(`Не удалось загрузить значение по умолчанию`),
            type: "error"
        })
    }
}

/**
 * Обработка изменения значения поля формы редаткирования
 * @param field
 * @param callback
 */
const onChangeFieldValue: EntityEditHocActions['onChangeFieldValue'] = (field, callback) => {
    const {entityData, validation} = context$.getValue()
    if (!entityData) {
        return
    }

    const {values, schema} = entityData
    const config = editSchemaConfiguration()[schema]
    if (!config) {
        return
    }

    const fieldConfig = config.groups
        .map(g => g.fields)
        .flat()
        .find(fieldConf => fieldConf.field === field)

    if (!fieldConfig) {
        return
    }

    context$.next({
        ...context$.getValue(),
        validation: {
            ...validation,
            [field]: undefined
        },
        entityData: {
            ...entityData,
            values: {
                ...values,
                [field]: callback(values[field])
            }
        }
    })
}

/**
 * Установка схемы для работы контекста
 *
 * @param schema
 * @param primaryKey
 */
const setSchema: EntityEditHocActions['setSchema'] = async (schema, primaryKey) => {
    context$.next(new DefaultContext())

    try {
        const entityData = await entityGetterService().GetEntity(schema, primaryKey)

        context$.next({
            ...context$.getValue(),
            entityData: entityData,
        })
    } catch (e) {
        notificationsDispatcher().dispatch({
            message: i18n.t(`Не удалось загрузить элемент`),
            type: "error"
        })
    }
}

// Экспортируем результирующий тип, описывающий текущий контекст
export type WithEntityEditHoc<T = {}> =
    T
    & EntityEditHocContext
    & EntityEditHocActions;

// Тип, описывающий текущий HOC компонент
type HocType = { <T>(Component: React.ComponentType<WithEntityEditHoc<T>>): React.ComponentType<T> };

// Все доступные действия. Собираются для последующего экспорта
const actions: EntityEditHocActions = {
    setSchema,
    onChangeFieldValue,
    onResetFieldValue,
    onSave,
}

/**
 * Хук для использования данных там, где нет возможности использовать
 * HOC или из соображений качества кода лучше использовать хук
 */
export const useEntityEdit = (...pipeModifications: OperatorFunction<any, EntityEditHocContext>[]): WithEntityEditHoc => {
    const [contextValue, setContextValue] = useState(context$.getValue())
    useEffect(() => {
        const subscription = context$
            // @ts-ignore
            .pipe(...pipeModifications)
            .subscribe({
                next: data => setContextValue(data)
            })

        return () => {
            try {
                subscription.unsubscribe()
            } catch (e) {
            }
        }
    })

    return {
        ...contextValue,
        ...actions
    }
}

const EntityEditHoc = (...pipeModifications: OperatorFunction<any, EntityEditHocContext>[]) => withBehaviourSubject(
    context$,
    {...actions},
    ...pipeModifications
) as HocType;

// Экспортируем HOC
export default EntityEditHoc;