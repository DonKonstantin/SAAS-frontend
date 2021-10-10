import {ActionHandler} from "../system/ActionHandler";
import {ReduxActionTypes} from "../../../ReduxStore";
import {LanguagesStore} from "../../../stores/Languages";

/**
 * Обработчик сохранения перезагруженного листинга языков
 */
export class StoreReloadedLanguagesHandler implements ActionHandler<LanguagesStore, "LANGUAGES_STORE_RELOAD_LANGUAGES"> {
    handle(_: LanguagesStore, payload: ReduxActionTypes["LANGUAGES_STORE_RELOAD_LANGUAGES"]): LanguagesStore {
        return JSON.parse(JSON.stringify(payload));
    }
}