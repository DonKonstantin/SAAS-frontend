import {ReduxStore} from "../ReduxStore";
import {Reducer} from "./Reducer";
import {handlers} from "./handlers";
import {Authorization} from "../stores/Authorization";
import {
    DefaultAuthorization,
    DefaultDebug,
    DefaultEntityEdit,
    DefaultEntityList,
    DefaultLanguages,
    DefaultRouteCalculationStore
} from "./defaults";
import ReducerWithHandler from "./ReducerWithHandler";
import {EntityList} from "../stores/EntityList";
import {EntityEdit} from "../stores/EntityEdit";
import {Debug} from "../stores/Debug";
import {LanguagesStore} from "../stores/Languages";
import {RouteCalculationStore} from "../stores/RouteCalculationStore";

// Тип, описывающий коллекцию обработчиков событий хранилища Redux
export type Reducers = { [item in keyof ReduxStore]: Reducer<ReduxStore[item]> }

/**
 * Зарегистрированные в системе редьссеры для Redux store.
 *
 * При добавлении нового Store просто добавьте новый редьюсер сюда, а так-же
 * коллекцию hadlers в ./handlers/index.
 *
 * По сути данная схема подтянет строгую типизацию ко всем событиям Redux Store,
 * а так-же позволит разделить обработчики событий по разным классам, что облегчит
 * в перспективе разбор кода и поиск ошибок.
 */
export const registeredReducers: {(): Reducers} = () => {
    const reducers: Reducers = {
        Authorization: ReducerWithHandler<Authorization>(handlers.Authorization, new DefaultAuthorization()),
        EntityList: ReducerWithHandler<EntityList>(handlers.EntityList, new DefaultEntityList()),
        EntityEdit: ReducerWithHandler<EntityEdit>(handlers.EntityEdit, new DefaultEntityEdit()),
        Debug: ReducerWithHandler<Debug>(handlers.Debug, new DefaultDebug()),
        LanguagesStore: ReducerWithHandler<LanguagesStore>(handlers.LanguagesStore, new DefaultLanguages()),
        RouteCalculation: ReducerWithHandler<RouteCalculationStore>(handlers.RouteCalculation, new DefaultRouteCalculationStore()),
    };

    return reducers;
};

