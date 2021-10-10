import {ActionHandler} from "../system/ActionHandler";
import {Authorization} from "../../../stores/Authorization";
import {ReduxActionTypes} from "../../../ReduxStore";
import {clientServerDetector} from "../../../../services/clientServerDetector";

/**
 * Обработчик изменения данных пользователя
 */
export class StoreAuthorizationHandler implements ActionHandler<Authorization, "AUTHORIZATION_STORE_AUTHORISATION"> {
    handle(_: Authorization, payload: ReduxActionTypes["AUTHORIZATION_STORE_AUTHORISATION"]): Authorization {
        if (clientServerDetector().isClient()) {
            document.cookie = `token=${payload.token}; path=/;`;
        }

        return {...payload}
    }
}
