import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {ReduxAction} from "../../system/ReduxAction";
import {DispatchNotification} from "../../../services/notifications/NotificationsDispatcher";
import {call, put} from "@redux-saga/core/effects";
import {entityDeleteService} from "../../../services/entityDeleteService";
import {notificationsDispatcher} from "../../../services/notifications";

/**
 * Сага удаления сущностей
 */
export class RemoveEntitiesSaga implements Saga<"ENTITY_LIST_REMOVE_ENTITIES"> {
    readonly eventType: EventsType = "Latest";

    /**
     * Удаление сущностей
     * @param action
     */
    *handle(action: ReduxAction<"ENTITY_LIST_REMOVE_ENTITIES">): IterableIterator<Effects> {
        // Включаем индикацию удаления
        yield put<ReduxAction<"ENTITY_LIST_SET_CHANGE_IN_PROGRESS_STATE">>({
            payload: true,
            type: "ENTITY_LIST_SET_CHANGE_IN_PROGRESS_STATE",
        });

        // @ts-ignore
        let success: boolean = yield call(async () => await entityDeleteService().DeleteItemsById(action.payload.data.currentData.parameters, action.payload.items));

        // Выключаем индикацию удаления
        yield put<ReduxAction<"ENTITY_LIST_SET_CHANGE_IN_PROGRESS_STATE">>({
            payload: false,
            type: "ENTITY_LIST_SET_CHANGE_IN_PROGRESS_STATE",
        });

        let notification: DispatchNotification;
        if (success) {
            notification = {message: "Элементы успешно удалены", type: "success"}
        } else {
            notification = {message: "Ошибка удаления", type: "error"}
        }

        notificationsDispatcher().dispatch(notification);
        if (!success) {
            return undefined
        }

        // Удаляем закэшированные данные, т.к. не известно, какие отношения были удалены
        // совместно с удаленными сущностями
        yield put<ReduxAction<"ENTITY_LIST_DROP_OUTDATED_SCHEMAS_WITHOUT_PASSED">>({
            payload: [action.payload.data.schema],
            type: "ENTITY_LIST_DROP_OUTDATED_SCHEMAS_WITHOUT_PASSED",
        });

        // Перезагружаем текущий листинг, т.к. в нем удалена часть строк
        yield put<ReduxAction<"ENTITY_LIST_STORE_CHANGE_SCHEMA_DATA">>({
            payload: {
                schema: action.payload.data.schema,
                data: action.payload.data
            },
            type: "ENTITY_LIST_STORE_CHANGE_SCHEMA_DATA",
        });

        if (action.payload.data.schema === "language") {
            yield put<ReduxAction<"LANGUAGES_NEED_RELOAD_LANGUAGES">>({
                payload: undefined,
                type: "LANGUAGES_NEED_RELOAD_LANGUAGES",
            })
        }
    }
}