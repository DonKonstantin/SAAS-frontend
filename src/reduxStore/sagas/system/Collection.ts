import {Effects, RegisteredSagas, Saga, SagasCollection} from "./SagasCollection";
import {AllEffect, ForkEffect} from "@redux-saga/core/effects";
import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import {ReduxAction} from "../../system/ReduxAction";
import {AvailableAction} from "../../ReduxStore";

type SagaCallback = { (): IterableIterator<ForkEffect> };

/**
 * Основная коллекция саг, регистрирует все переданные в нее саги
 */
export class Collection implements SagasCollection {

    private readonly registeredSagas: RegisteredSagas;

    /**
     * Конструктор саги
     *
     * @param registeredSagas
     */
    constructor(registeredSagas: RegisteredSagas) {
        this.registeredSagas = registeredSagas;
    }

    /**
     * Запуск регистрации саг
     */
    *run(): IterableIterator<AllEffect<any>> {
        const callbacks = Object.keys(this.registeredSagas)
            .reduce<SagaCallback[]>((result: SagaCallback[], key: keyof RegisteredSagas): SagaCallback[] => {
                const saga = this.registeredSagas[key];
                if (saga === undefined) {
                    return result
                }

                const sagasArray = Array.isArray(saga) ? saga : [saga];
                return [
                    ...result,
                    ...sagasArray.map<SagaCallback>((saga: Saga<AvailableAction>): SagaCallback => {
                        const event = saga && saga.eventType === "Latest" ? takeLatest : takeEvery;
                        return function *(): IterableIterator<ForkEffect> {
                            yield event(
                                key,
                                function (action: ReduxAction<AvailableAction>): IterableIterator<Effects> {
                                    return saga.handle(action)
                                }
                            );
                        };
                    }),
                ];
            }, [])
        ;

        yield all(callbacks.map(callback => callback()));
    }
}