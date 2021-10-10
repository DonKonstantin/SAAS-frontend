import * as React from "react";
import {ReduxStore} from "../reduxStore/ReduxStore";

// Базовый интерфейс коллекции
export interface Collection<T> {[item: string]: T}

// Базовый интерфейс коллекции с числом в виде ключа
export interface NumericCollection<T> {[item: number]: T}

// Тип реализующий отрицание переданного типа
export declare type Not<T> = Exclude<T, any>;

// Тип, позволяющий генерировать не обязательные параметры.
// По сути объявляет все поля переданного типа не обязательными.
export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }

// Тип, позволяющий генерировать защищенные от записи параметры.
// Объявляет все поля в объекте и во вложенных ReadOnly
export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }

export interface NextPage<T> extends React.ComponentClass<T, ReduxStore> {
    getInitialProps(context: any): Promise<Partial<T>>
}
