import {ActionHandler} from "../system/ActionHandler";
import {ReduxActionTypes} from "../../../ReduxStore";
import {LanguagesStore} from "../../../stores/Languages";

/**
 * Обработчик изменения основного языка
 */
export class ChangePrimaryLanguagesHandler implements ActionHandler<LanguagesStore, "LANGUAGES_CHANGE_PRIMARY_LANG"> {
    handle(store: LanguagesStore, payload: ReduxActionTypes["LANGUAGES_CHANGE_PRIMARY_LANG"]): LanguagesStore {
        return {
            ...store,
            primaryLangId: payload,
        };
    }
}