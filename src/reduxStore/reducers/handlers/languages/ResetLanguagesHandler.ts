import {ActionHandler} from "../system/ActionHandler";
import {LanguagesStore} from "../../../stores/Languages";
import {DefaultLanguages} from "../../defaults";

/**
 * Обработчик сброса языков
 */
export class ResetLanguagesHandler implements ActionHandler<LanguagesStore, "LANGUAGES_NEED_RESET_LANGUAGES"> {
    handle(): LanguagesStore {
        return {...(new DefaultLanguages())};
    }
}