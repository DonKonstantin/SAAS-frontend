import {LoadingParams, StoreLoader} from "../system";
import {DeepPartial} from "../../../services/types";
import {ReduxStore} from "../../ReduxStore";
import {ListPageConfiguration} from "../../../settings/pages/system/list";
import {entityListStoreLoader} from "../../../services/entityListStoreLoader";
import {EntityList} from "../../stores/EntityList";

/**
 * Загрузчик данных листинга сущностей
 */
export class EntityListLoader implements StoreLoader<"EntityList"> {
    async Load(params: LoadingParams): Promise<DeepPartial<ReduxStore["EntityList"]>> {
        if (!params.token || params.token.length === 0) return {};

        const configuration: ListPageConfiguration<any> = params.initialProps?.pageProps?.configuration;
        if (!configuration) return {
            loaded: {},
            isLoading: false,
        };

        const {additionFilters = {}} = params.initialProps?.pageProps || {};

        const schemaStore = await entityListStoreLoader(params.token).LoadStoreForConfiguration(configuration, additionFilters);
        //@ts-ignore
        return <EntityList>{
            loaded: {
                [configuration.schema]: schemaStore
            },
            isLoading: false,
        };
    }
}