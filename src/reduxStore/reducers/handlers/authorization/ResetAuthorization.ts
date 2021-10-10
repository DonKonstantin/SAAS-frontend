import {ActionHandler} from "../system/ActionHandler";
import {Authorization} from "../../../stores/Authorization";
import {DefaultAuthorization} from "../../defaults";

/**
 * Сброс данных авторизации пользователя
 */
export class ResetAuthorization implements ActionHandler<Authorization, "AUTHORIZATION_RESET_STORE"> {
    handle(): Authorization {
        return {
            ...new DefaultAuthorization()
        }
    }
}