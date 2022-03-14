import {BehaviorSubject, OperatorFunction} from "rxjs";
import {useEffect, useState} from "react";
import withBehaviourSubject from "../connectors/withBehaviourSubject";

type BulkEditFilesContextContext = {
    isOpen: boolean
}

// Свойства контекста по умолчанию
class DefaultContext implements BulkEditFilesContextContext {
    isOpen = false
}

type BulkEditFilesContextActions = {
    /**
     * Показать/скрыть глобальный loader
     * @param value
     */
    toggleBulkEditFiles(value: boolean): void
};

// Создаем изначальный State
const context$ = new BehaviorSubject<BulkEditFilesContextContext>(new DefaultContext);

/**
 * Показать/скрыть глобальный loader
 * @param value
 */
const toggleBulkEditFiles = (value: boolean) => {
    context$.next({
        isOpen: value
    })
}

// Экспортируем результирующий тип, описывающий текущий контекст
export type WithBulkEditFilesContextData<T = {}> =
    T
    & BulkEditFilesContextContext
    & BulkEditFilesContextActions;

// Тип, описывающий текущий HOC компонент
type HocType = { <T>(Component: React.ComponentType<WithBulkEditFilesContextData<T>>): React.ComponentType<T> };

const actions: BulkEditFilesContextActions = {
    toggleBulkEditFiles
};

const withBulkEditFilesContext = withBehaviourSubject(
    context$,
    actions,
) as HocType;

export const useBulkEditFiles = (...pipeModifications: OperatorFunction<any, BulkEditFilesContextContext>[]): WithBulkEditFilesContextData => {
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

// Экспортируем HOC
export default withBulkEditFilesContext;
