import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {ReduxAction} from "../../system/ReduxAction";
import {entityListStoreLoader} from "../../../services/entityListStoreLoader";
import {listSchemaConfiguration} from "../../../settings/pages";
import {call, put} from "@redux-saga/core/effects";
import {ListOfSchema} from "../../stores/EntityList";
import {loggerFactory} from "../../../services/logger";

/**
 * Сага загрузки базовых данных для таблиц
 */
export class LoadSchemaBaseDataSaga implements Saga<"ENTITY_LIST_NEED_LOAD_SCHEMA_BASE_DATA"> {
    readonly eventType: EventsType = "Latest";

    /**
     * Обработка загрузки
     * @param action
     */
    * handle(action: ReduxAction<"ENTITY_LIST_NEED_LOAD_SCHEMA_BASE_DATA">): IterableIterator<Effects> {
        const config = listSchemaConfiguration()[action.payload.schema];
        if (!config) {
            return undefined
        }

        const logger = loggerFactory().make(`LoadSchemaBaseDataSaga`);
        logger.Debug(`Starting loading base data for schema: "${action.payload.schema}"`, action.payload.additionFilter);

        // Включаем индикатор загрузки
        yield put<ReduxAction<"ENTITY_LIST_CHANGE_GLOBAL_LOADING_STATE">>({
            payload: true,
            type: "ENTITY_LIST_CHANGE_GLOBAL_LOADING_STATE",
        });

        // @ts-ignore
        let data: ListOfSchema<any> = yield call(async () => await entityListStoreLoader().LoadStoreForConfiguration(config, action.payload.additionFilter));
        logger.Debug(`Loaded base data for schema: "${action.payload.schema}"`, action.payload.additionFilter, data);

        if (!data) {
            return undefined
        }

        yield put<ReduxAction<"ENTITY_LIST_STORE_LOADED_SCHEMA_BASE_DATA">>({
            payload: {
                schema: action.payload.schema,
                data: data,
            },
            type: "ENTITY_LIST_STORE_LOADED_SCHEMA_BASE_DATA",
        })
    }

}