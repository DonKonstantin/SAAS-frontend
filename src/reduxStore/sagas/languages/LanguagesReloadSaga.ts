import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {call, put} from "@redux-saga/core/effects";
import {languagesLoader} from "../../../services/languagesLoader";
import {LanguagesStore} from "../../stores/Languages";
import {ReduxAction} from "../../system/ReduxAction";

/**
 * Сага перезагрузки хранилища языков
 */
export class LanguagesReloadSaga implements Saga<"LANGUAGES_NEED_RELOAD_LANGUAGES"> {
    readonly eventType: EventsType = "Latest";

    /**
     * Перезагрузка хранилища
     */
    *handle(action: ReduxAction<"LANGUAGES_NEED_RELOAD_LANGUAGES">): IterableIterator<Effects> {
        // @ts-ignore
        let data: LanguagesStore = yield call(async () => await languagesLoader(action.payload).Load())

        yield put<ReduxAction<"LANGUAGES_STORE_RELOAD_LANGUAGES">>({
            payload: data,
            type: "LANGUAGES_STORE_RELOAD_LANGUAGES",
        })
    }
}