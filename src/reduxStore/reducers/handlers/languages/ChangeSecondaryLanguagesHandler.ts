import {ActionHandler} from "../system/ActionHandler";
import {ReduxActionTypes} from "../../../ReduxStore";
import {LanguagesStore} from "../../../stores/Languages";

/**
 * Обработчик изменения дополнительного языка
 */
export class ChangeSecondaryLanguagesHandler implements ActionHandler<LanguagesStore, "LANGUAGES_CHANGE_SECONDARY_LANG"> {
    handle(store: LanguagesStore, payload: ReduxActionTypes["LANGUAGES_CHANGE_SECONDARY_LANG"]): LanguagesStore {
        return {
            ...store,
            secondaryLangId: payload,
        };
    }
}