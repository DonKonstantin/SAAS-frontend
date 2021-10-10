import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {ReduxAction} from "../../system/ReduxAction";
import {call, put} from "@redux-saga/core/effects";
import {loggerFactory} from "../../../services/logger";
import {authService} from "../../../services/authService";
import {clientServerDetector} from "../../../services/clientServerDetector";
import {Authorization} from "../../stores/Authorization";

/**
 * Обработка корректной авторизации пользователя
 */
export class LoggedInSaga implements Saga<"AUTHORIZATION_LOGGED_IN"> {
    readonly eventType: EventsType = "Latest";

    // Обработка события
    *handle(action: ReduxAction<"AUTHORIZATION_LOGGED_IN">): IterableIterator<Effects> {
        if (clientServerDetector().isClient()) {
            document.cookie = `token=${action.payload}; path=/;`;
        }

        const logger = loggerFactory().make(`LoadUserDataSaga`);

        let data = yield call(async () => await authService().GetUserInfo(action.payload));
        if (undefined === data) {
            logger.Error(`Failed to load user info`)
        }

        // @ts-ignore
        let result: Authorization = {token: action.payload, user: {...data}};

        logger.Debug(`Loaded user info:`, data);
        yield put<ReduxAction<"AUTHORIZATION_STORE_AUTHORISATION">>({
            payload: result,
            type: "AUTHORIZATION_STORE_AUTHORISATION",
        })
    }
}