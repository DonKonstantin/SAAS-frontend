import {LoadingParams, StoreLoader} from "../system";
import {DeepPartial} from "../../../services/types";
import {ReduxStore} from "../../ReduxStore";
import {languagesLoader} from "../../../services/languagesLoader";
import {DefaultLanguages} from "../../reducers/defaults";

/**
 * Загрузчик языков для админки
 */
export class LanguagesStoreLoader implements StoreLoader<"LanguagesStore"> {
    async Load(params: LoadingParams): Promise<DeepPartial<ReduxStore["LanguagesStore"]>> {
        if (!params.token || params.token.length === 0) {
            return new DefaultLanguages()
        }

        return await languagesLoader(params.token).Load()
    }
}