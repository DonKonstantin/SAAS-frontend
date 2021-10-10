import {SagasCollection} from "./SagasCollection";
import {Collection} from "./Collection";
import {sagas} from "../index";
import {AllEffect} from "@redux-saga/core/effects";

const rootSaga: SagasCollection = new Collection(sagas);

// Экспортируем корневую сагу для подключения к middleware
export const rootSagas = function *(): IterableIterator<AllEffect<any>> {
    yield* rootSaga.run();
};
