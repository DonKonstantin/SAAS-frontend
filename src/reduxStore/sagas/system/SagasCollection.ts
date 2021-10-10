import {AllEffect, PutEffect, CallEffect, TakeEffect} from 'redux-saga/effects'
import {ReduxAction} from "../../system/ReduxAction";
import {AvailableAction, ReduxActionTypes} from "../../ReduxStore";

// Тип, описывающий все имеющиеся в системе саги
export type RegisteredSagas = {[T in keyof ReduxActionTypes]?: Saga<T> | Saga<T>[]}
export type EventsType = "Every" | "Latest"
export type Effects = PutEffect<ReduxAction<AvailableAction>> | CallEffect | TakeEffect;

// Интерфейс саги
export interface Saga<T extends AvailableAction> {
    readonly eventType: EventsType;

    // Обработчик саги
    handle(action: ReduxAction<T>): IterableIterator<Effects>;
}

// Интерфейс коллекции саг
export interface SagasCollection {
    // Регистрация саг
    run(): IterableIterator<AllEffect<any>>
}
