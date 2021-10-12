import {BehaviorSubject, OperatorFunction} from "rxjs";
import React from "react";
import withBehaviourSubject from "../connectors/withBehaviourSubject";

// Доступные языки для выбора
export type Languages = "ru";

// Контекст шагов импорта
type LanguageHocContext = {
    currentLanguage: Languages
    availableLanguages: Languages[]
    languageFlags: { [T in Languages]: string }
};

// События, происходящие с контекстом
type LanguageHocActions = {
    // Обработчик изменения языка
    onChangeLanguage: { (lang: Languages): void }
};

// Свойства контекста по умолчанию
class DefaultContext implements LanguageHocContext {
    availableLanguages: Languages[] = ["ru"];
    currentLanguage: Languages = "ru";
    languageFlags: { [T in Languages]: string } = {
        ru: "RU",
    };
}

// Создаем изначальный State
const context$ = new BehaviorSubject<LanguageHocContext>(new DefaultContext);

/**
 * Обработчик изменения языка
 * @param lang
 */
const onChangeLanguage = (lang: Languages) => {
    context$.next({
        ...context$.getValue(),
        currentLanguage: lang,
    })
};

// Экспортируем результирующий тип, описывающий текущий контекст
export type WithLanguageHoc<T> =
    T
    & LanguageHocContext
    & LanguageHocActions;

// Тип, описывающий текущий HOC компонент
type HocType = { <T>(Component: React.ComponentType<WithLanguageHoc<T>>): React.ComponentType<T> };
const LanguageHoc = (...pipeModifications: OperatorFunction<any, LanguageHocContext>[]) => withBehaviourSubject(
    context$,
    {
        onChangeLanguage,
    },
    ...pipeModifications
) as HocType;

// Экспортируем HOC
export default LanguageHoc;