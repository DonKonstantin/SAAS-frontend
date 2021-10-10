import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {ReduxAction} from "../../system/ReduxAction";
import {clientServerDetector} from "../../../services/clientServerDetector";
import {put} from "@redux-saga/core/effects";

/**
 * Сохранение полученного токена в cookie для корректной обработки на стороне сервера
 */
export class ResetTokenFromCookie implements Saga<"AUTHORIZATION_RESET"> {
    readonly eventType: EventsType = "Latest";

    /**
     * Обработка события
     * @param action
     */
    *handle(action: ReduxAction<"AUTHORIZATION_RESET">): IterableIterator<Effects> {
        if (clientServerDetector().isClient()) {
            document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        }

        yield put<ReduxAction<"AUTHORIZATION_RESET_STORE">>({
            payload: action.payload,
            type: "AUTHORIZATION_RESET_STORE",
        })

        yield put<ReduxAction<"ENTITY_LIST_STORE_RESET">>({
            payload: undefined,
            type: "ENTITY_LIST_STORE_RESET",
        })

        yield put<ReduxAction<"ENTITY_EDIT_RESET_STORE">>({
            payload: undefined,
            type: "ENTITY_EDIT_RESET_STORE",
        })

        yield put<ReduxAction<"LANGUAGES_NEED_RESET_LANGUAGES">>({
            payload: undefined,
            type: "LANGUAGES_NEED_RESET_LANGUAGES",
        })
    }
}