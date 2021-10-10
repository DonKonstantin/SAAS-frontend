import {StoreLoader} from "../system";
import {ReduxStore} from "../../ReduxStore";
import {DeepPartial} from "../../../services/types";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

// Загрузчик данных режима отладки
export class DebugLoader implements StoreLoader<"Debug"> {
    async Load(): Promise<DeepPartial<ReduxStore["Debug"]>> {
        return {
            isEnabled: publicRuntimeConfig.debug,
        }
    }
}