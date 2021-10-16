import {auditTime, BehaviorSubject, debounceTime, distinctUntilChanged, OperatorFunction, Subject} from "rxjs";
import React, {useEffect, useState} from "react";
import withBehaviourSubject from "../connectors/withBehaviourSubject";
import {Schemas} from "../settings/schema";
import {ListLoadingParameters, OrderParameter} from "../services/listDataLoader/listLoader/interfaces";
import {BaseData} from "../services/listDataLoader/interfaces";
import {ListResponse} from "../services/listDataLoader/listLoader/types";
import {LoadedFilterData} from "../services/listDataLoader/filterLoader/interfaces";
import {FilterFieldComponents} from "../services/listDataLoader/filterLoader/types";
import {entityListStoreLoader} from "../services/entityListStoreLoader";
import {listSchemaConfiguration} from "../settings/pages";
import {notificationsDispatcher} from "../services/notifications";
import i18n from "i18next";
import {listDataLoader} from "../services/listDataLoader";
import {LoadedFilterValues} from "../services/listDataLoader/filterLoader/filterValueLoader/interfaces";
import {entityDeleteService} from "../services/entityDeleteService";

// Загруженный листинг сущностей
export interface ListOfSchema<T extends keyof Schemas> {
    schema: T
    baseConfiguration: ListLoadingParameters<T>
    baseData: BaseData<T>
    currentData: ListResponse<T>
}

// Контекст шагов импорта
export type EntityListHocContext<T extends keyof Schemas = keyof Schemas> = {
    data: ListOfSchema<T> | undefined
    additionFilter: { [T: string]: string } | undefined

    itemsToDelete: any[]
    isLoading: boolean
};

// События, происходящие с контекстом
type EntityListHocActions<T extends keyof Schemas = keyof Schemas> = {
    // Инициализация подписок внутри контекста
    initializeSubscriptions: { (): { (): void } }

    // Установка текущей схемы для отображения
    setSchema: { (schema: T, additionFilter?: { [T: string]: string }): void }

    // Обработка изменения сортировки
    onChangeOrder: { (orders: OrderParameter<any>[]): void }

    // Обработка изменения offset
    onChangeOffset: { (offset: number): void }

    // Обработка изменения значения фильтра
    onChangeFilterValues: {
        <F extends keyof Schemas[T]['fields']>(
            field: F,
            value: LoadedFilterData<keyof FilterFieldComponents, T, F>
        ): void
    }

    // Обработка сброса параметров фильтрации
    onResetFilterValues: { (): void }

    // Обработка изменения limit
    onChangeLimit: { (limit: number): void }

    // Обработка изменения дополнительных данных листинга
    onChangeAdditionData: { (callback: { <Data extends { [K: string]: any } = { [K: string]: any }>(data: Data): Data }): void }

    // Обработка удаления элементов
    onDeleteItems: { (items: any[]): void }

    // Подтверждение удаления элементов
    onDeleteSubmit: { (): void }
};

// Свойства контекста по умолчанию
class DefaultContext implements EntityListHocContext {
    isLoading: boolean = false;
    data: ListOfSchema<keyof Schemas> | undefined;
    itemsToDelete: any[] = [];
    additionFilter: { [p: string]: any } | undefined;
}

// Создаем изначальный State
const context$ = new BehaviorSubject<EntityListHocContext>(new DefaultContext);

// Контекст полной перезагрузки данных
const fullDataReloadCtx$ = new Subject<{ schema: keyof Schemas, additionFilter?: { [T: string]: string } }>()

// Контекст подписки на изменение схемы для отображения
const schemaChangeCtx$ = new Subject<{ schema: keyof Schemas, additionFilter?: { [T: string]: string } }>()

// Контекст подписки на изменения данных, требующих перезагрузки
const dataChangeCtx$ = new Subject<ListOfSchema<keyof Schemas>>()

/**
 * Подтверждение удаления элементов
 */
const onDeleteSubmit: EntityListHocActions['onDeleteSubmit'] = async () => {
    const {itemsToDelete, data, additionFilter} = context$.getValue()
    if (0 === itemsToDelete.length || !data) {
        return
    }

    context$.next({
        ...context$.getValue(),
        isLoading: true,
    })

    try {
        await entityDeleteService().DeleteItemsById(data.currentData.parameters, itemsToDelete)

        notificationsDispatcher().dispatch({
            message: i18n.t(`Элементы успешно удалены`),
            type: "success"
        })

        context$.next(new DefaultContext())

        fullDataReloadCtx$.next({schema: data.schema, additionFilter})
    } catch (e) {
        notificationsDispatcher().dispatch({
            message: i18n.t(`Не удалось удалить элементы`),
            type: "error"
        })
    }
}

/**
 * Обработка удаления элементов
 * @param items
 */
const onDeleteItems: EntityListHocActions['onDeleteItems'] = items => {
    context$.next({
        ...context$.getValue(),
        itemsToDelete: items
    })
}

/**
 * Обработка изменения дополнительных данных листинга
 * @param callback
 */
const onChangeAdditionData: EntityListHocActions['onChangeAdditionData'] = callback => {
    const {data, ...other} = context$.getValue()
    if (!data) {
        return
    }

    context$.next({
        ...other,
        data: {
            ...data,
            currentData: {
                ...data.currentData,
                additionData: callback(data.currentData.additionData)
            }
        }
    })
}

/**
 * Обработка изменения limit
 * @param limit
 */
const onChangeLimit: EntityListHocActions['onChangeLimit'] = limit => {
    const {data} = context$.getValue()
    if (!data) {
        return
    }

    dataChangeCtx$.next({
        ...data,
        currentData: {
            ...data.currentData,
            parameters: {
                ...data.currentData.parameters,
                offset: 0,
                limit: limit,
            }
        }
    })
}

/**
 * Обработка сброса параметров фильтрации
 */
const onResetFilterValues: EntityListHocActions['onResetFilterValues'] = () => {
    const {data} = context$.getValue()
    if (!data) {
        return
    }

    dataChangeCtx$.next({
        ...data,
        currentData: {
            ...data.currentData,
            parameters: {
                ...data.currentData.parameters,
                offset: 0,
                currentFilterValues: {
                    ...data.currentData.parameters.originalFilterValues,
                }
            }
        }
    })
}

/**
 * Обработка изменения значения фильтра
 * @param field
 * @param value
 */
const onChangeFilterValues: EntityListHocActions['onChangeFilterValues'] = (field, value) => {
    const {data} = context$.getValue()
    if (!data) {
        return
    }

    dataChangeCtx$.next({
        ...data,
        currentData: {
            ...data.currentData,
            parameters: {
                ...data.currentData.parameters,
                offset: 0,
                currentFilterValues: {
                    ...data.currentData.parameters.currentFilterValues,
                    [field]: value,
                } as LoadedFilterValues<keyof Schemas>
            }
        }
    })
}

/**
 * Обработка изменения offset
 * @param offset
 */
const onChangeOffset: EntityListHocActions['onChangeOffset'] = offset => {
    const {data} = context$.getValue()
    if (!data) {
        return
    }

    dataChangeCtx$.next({
        ...data,
        currentData: {
            ...data.currentData,
            parameters: {
                ...data.currentData.parameters,
                offset: offset
            }
        }
    })
}

/**
 * Обработка изменения сортировки
 * @param orders
 */
const onChangeOrder: EntityListHocActions['onChangeOrder'] = orders => {
    const {data} = context$.getValue()
    if (!data) {
        return
    }

    dataChangeCtx$.next({
        ...data,
        currentData: {
            ...data.currentData,
            parameters: {
                ...data.currentData.parameters,
                order: orders
            }
        }
    })
}

/**
 * Установка текущей схемы для отображения
 * @param schema
 * @param additionFilter
 */
const setSchema: EntityListHocActions['setSchema'] = (schema, additionFilter) => {
    schemaChangeCtx$.next({schema, additionFilter})
}

/**
 * Инициализация подписок внутри контекста
 */
const initializeSubscriptions = () => {
    // Подписываемся на запросы полной перезагрузки данных
    const fullDataReloadSubscription = fullDataReloadCtx$
        .pipe(debounceTime(1000))
        .subscribe({
            next: async ({schema, additionFilter = {}}) => {
                const config = listSchemaConfiguration()[schema];
                if (!config) {
                    return
                }

                try {
                    const data = await entityListStoreLoader().LoadStoreForConfiguration(config, additionFilter)
                    if (!data) {
                        return undefined
                    }

                    context$.next({
                        ...context$.getValue(),
                        data: data,
                        additionFilter: additionFilter,
                        itemsToDelete: [],
                    })
                } catch (e) {
                    notificationsDispatcher().dispatch({
                        message: i18n.t(`Не удалось загрузить данные, попробуйте обновить страницу`),
                        type: "warning"
                    })

                    throw e
                }
            }
        })

    // Подписка на изменение схемы
    const schemaLoadSubscription = schemaChangeCtx$
        .pipe(distinctUntilChanged())
        .subscribe({
            next: async ({schema, additionFilter}) => {
                // Сбрасываем текущие данные листинга
                context$.next(new DefaultContext())

                // Отправляем запрос полной перезагрузки данных схемы
                fullDataReloadCtx$.next({schema, additionFilter})
            }
        })

    // Подписка на изменение данных, для которых необходима перезагрузка
    const schemaUpdateSubscription = dataChangeCtx$
        .pipe(auditTime(500))
        .subscribe({
            next: async data => {
                try {
                    context$.next({
                        ...context$.getValue(),
                        isLoading: true,
                    })

                    const loadedData = await listDataLoader().Load(data.currentData.parameters)

                    const {data: lastData, ...other} = context$.getValue()
                    if (!lastData) {
                        return
                    }

                    const {currentData} = lastData

                    context$.next({
                        ...other,
                        isLoading: false,
                        itemsToDelete: [],
                        data: {
                            ...lastData,
                            currentData: {
                                count: loadedData.count || currentData.count,
                                parameters: loadedData.parameters,
                                rows: loadedData.rows,
                                additionData: loadedData.additionData || currentData.additionData,
                            }
                        },
                    })
                } catch (e) {
                    notificationsDispatcher().dispatch({
                        message: i18n.t(`Не удалось загрузить изменения`),
                        type: "warning"
                    })
                }
            }
        })

    // Подписка на изменения данных. Сохренение изменений в основной контекст
    const schemaStoreDataChangesSubscription = dataChangeCtx$
        .pipe(distinctUntilChanged())
        .subscribe({
            next: data => {
                context$.next({
                    ...context$.getValue(),
                    data: data,
                    itemsToDelete: [],
                    isLoading: true,
                })
            }
        })

    return () => {
        schemaLoadSubscription.unsubscribe()
        schemaUpdateSubscription.unsubscribe()
        schemaStoreDataChangesSubscription.unsubscribe()
        fullDataReloadSubscription.unsubscribe()
    }
}

// Экспортируем результирующий тип, описывающий текущий контекст
export type WithEntityListHoc<T = {}> =
    T
    & EntityListHocContext
    & EntityListHocActions;

// Тип, описывающий текущий HOC компонент
type HocType = { <T>(Component: React.ComponentType<WithEntityListHoc<T>>): React.ComponentType<T> };

// Все доступные действия. Собираются для последующего экспорта
const actions: EntityListHocActions = {
    initializeSubscriptions,
    setSchema,
    onChangeOrder,
    onChangeOffset,
    onChangeFilterValues,
    onResetFilterValues,
    onChangeLimit,
    onChangeAdditionData,
    onDeleteItems,
    onDeleteSubmit,
}

/**
 * Хук для использования данных там, где нет возможности использовать
 * HOC или из соображений качества кода лучше использовать хук
 */
export const useEntityList = (...pipeModifications: OperatorFunction<any, EntityListHocContext>[]): WithEntityListHoc => {
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

const EntityListHoc = (...pipeModifications: OperatorFunction<any, EntityListHocContext>[]) => withBehaviourSubject(
    context$,
    {...actions},
    ...pipeModifications
) as HocType;

// Экспортируем HOC
export default EntityListHoc;